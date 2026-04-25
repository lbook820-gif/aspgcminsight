#!/usr/bin/env node

/**
 * 链接有效性验证工具
 * 用于验证新闻条目中的链接是否有效
 */

import fs from 'fs';
import path from 'path';
import https from 'https';
import http from 'http';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// 配置
const CONFIG = {
  timeout: 10000, // 10秒超时
  maxRedirects: 5,
  userAgent: 'Mozilla/5.0 (compatible; LinkValidator/1.0)',
  retries: 2,
  retryDelay: 2000
};

// 颜色输出
const colors = {
  reset: '\x1b[0m',
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  cyan: '\x1b[36m'
};

function log(color, message) {
  console.log(`${colors[color]}${message}${colors.reset}`);
}

/**
 * 检查单个链接的有效性
 */
function checkLink(url, retries = CONFIG.retries) {
  return new Promise((resolve) => {
    const protocol = url.startsWith('https') ? https : http;
    
    const request = protocol.request(url, {
      method: 'HEAD',
      timeout: CONFIG.timeout,
      headers: {
        'User-Agent': CONFIG.userAgent
      }
    }, (response) => {
      // 处理重定向
      if (response.statusCode >= 300 && response.statusCode < 400 && response.headers.location) {
        if (CONFIG.maxRedirects > 0) {
          const redirectUrl = response.headers.location;
          checkLink(redirectUrl, retries).then(resolve);
          return;
        }
      }
      
      const isValid = response.statusCode >= 200 && response.statusCode < 400;
      resolve({
        url,
        status: response.statusCode,
        isValid,
        message: isValid ? 'OK' : `HTTP ${response.statusCode}`
      });
    });
    
    request.on('error', (error) => {
      if (retries > 0) {
        setTimeout(() => {
          checkLink(url, retries - 1).then(resolve);
        }, CONFIG.retryDelay);
      } else {
        resolve({
          url,
          status: 0,
          isValid: false,
          message: error.message
        });
      }
    });
    
    request.on('timeout', () => {
      request.destroy();
      if (retries > 0) {
        setTimeout(() => {
          checkLink(url, retries - 1).then(resolve);
        }, CONFIG.retryDelay);
      } else {
        resolve({
          url,
          status: 0,
          isValid: false,
          message: 'Timeout'
        });
      }
    });
    
    request.end();
  });
}

/**
 * 从 TypeScript 文件中提取新闻条目
 */
function extractNewsFromFile(filePath) {
  const content = fs.readFileSync(filePath, 'utf-8');
  const newsItems = [];
  
  // 使用正则表达式匹配新闻对象
  const newsRegex = /{\s*id:\s*['"]([^'"]+)['"],[\s\S]*?link:\s*['"]([^'"]+)['"]/g;
  let match;
  
  while ((match = newsRegex.exec(content)) !== null) {
    newsItems.push({
      id: match[1],
      link: match[2]
    });
  }
  
  return newsItems;
}

/**
 * 主验证函数
 */
async function validateLinks() {
  log('cyan', '\n🔍 开始验证新闻链接有效性...\n');
  
  const homeFile = path.join(__dirname, '../src/pages/Home.tsx');
  
  if (!fs.existsSync(homeFile)) {
    log('red', '❌ 找不到 Home.tsx 文件');
    process.exit(1);
  }
  
  const newsItems = extractNewsFromFile(homeFile);
  
  if (newsItems.length === 0) {
    log('yellow', '⚠️  未找到新闻条目');
    process.exit(0);
  }
  
  log('blue', `📋 共找到 ${newsItems.length} 条新闻\n`);
  
  const results = {
    valid: [],
    invalid: [],
    errors: []
  };
  
  // 检查每个链接
  for (let i = 0; i < newsItems.length; i++) {
    const item = newsItems[i];
    process.stdout.write(`[${i + 1}/${newsItems.length}] 检查 ${item.id}... `);
    
    try {
      const result = await checkLink(item.link);
      
      if (result.isValid) {
        log('green', `✅ ${result.status}`);
        results.valid.push({ ...item, status: result.status });
      } else {
        log('red', `❌ ${result.message}`);
        results.invalid.push({ ...item, message: result.message });
      }
    } catch (error) {
      log('red', `❌ ${error.message}`);
      results.errors.push({ ...item, message: error.message });
    }
    
    // 添加延迟避免请求过快
    await new Promise(resolve => setTimeout(resolve, 500));
  }
  
  // 输出统计报告
  console.log('\n' + '='.repeat(80));
  log('cyan', '\n📊 验证结果统计\n');
  log('green', `✅ 有效链接: ${results.valid.length}`);
  log('red', `❌ 无效链接: ${results.invalid.length}`);
  log('yellow', `⚠️  检查错误: ${results.errors.length}`);
  
  // 详细列出无效链接
  if (results.invalid.length > 0 || results.errors.length > 0) {
    log('red', '\n❌ 需要修复的链接:\n');
    
    [...results.invalid, ...results.errors].forEach(item => {
      log('yellow', `  [${item.id}] ${item.link}`);
      log('red', `    └─ ${item.message}\n`);
    });
    
    // 输出到文件
    const reportPath = path.join(__dirname, 'invalid-links-report.json');
    fs.writeFileSync(reportPath, JSON.stringify({
      timestamp: new Date().toISOString(),
      total: newsItems.length,
      valid: results.valid.length,
      invalid: results.invalid.length,
      errors: results.errors.length,
      invalidLinks: [...results.invalid, ...results.errors]
    }, null, 2));
    
    log('cyan', `\n📄 详细报告已保存至: ${reportPath}\n`);
    
    // 返回非零退出码表示有错误
    process.exit(1);
  } else {
    log('green', '\n✅ 所有链接均有效！\n');
    process.exit(0);
  }
}

// 执行验证
validateLinks().catch(error => {
  log('red', `\n❌ 验证过程出错: ${error.message}`);
  process.exit(1);
});
