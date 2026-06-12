with open('src/pages/DPAs.tsx', 'r') as f:
    content = f.read()

with open('new_dpa_entries.txt', 'r') as f:
    new_entries = f.read().rstrip('\n')

old = "const dpaUpdates: NewsItem[] = [\n  {\n    id: 'dpa-eu-020',"

new_text = "const dpaUpdates: NewsItem[] = [\n" + new_entries + "\n  {\n    id: 'dpa-eu-020',"

content = content.replace(old, new_text)

with open('src/pages/DPAs.tsx', 'w') as f:
    f.write(content)

print('Done. Lines:', len(content.splitlines()))
