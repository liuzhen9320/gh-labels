# 🏷️ GitHub Labels

Batch setup GitHub repository labels with one command. Supports priority, status, type, and more categories.

## ✨ Features

- 🎨 **Rich Label System** - Priority, status, type, technical areas, and more
- 🧹 **Auto Cleanup** - Optional cleanup of existing labels to avoid duplicates
- ⚡ **Lightning Fast** - Powered by Bun for maximum speed
- 🔄 **Batch Processing** - Bulk create and delete labels efficiently
- 💫 **Rate Limit Friendly** - Built-in delays to respect GitHub API limits

## 🚀 Quick Start

### Install Dependencies

```bash
bun install
```

### Basic Usage

```javascript
const ghLabels = require('./index.js');

// Basic usage
await ghLabels({
  username: 'your-username',
  repo: 'your-repo',
  token: 'your-github-token'
});
```

### Run with Bun

```bash
bun run your-script.js
```

## 🎯 Label Categories

| Category | Description | Examples |
|----------|-------------|----------|
| 🔴 **Priority** | Critical, High, Medium, Low | `Priority: Critical` |
| 📊 **Status** | Open, In Progress, Review Needed | `Status: Open` |
| 🔧 **Type** | Bug, Feature, Enhancement | `Type: Bug` |
| 🏗️ **Area** | Frontend, Backend, Database | `Area: Frontend` |
| 🚀 **Version** | Major, Minor, Patch | `Version: Major` |

## 📋 Configuration Options

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `username` | string | ✅ | GitHub username |
| `repo` | string | ✅ | Repository name |
| `token` | string | ✅ | GitHub access token |
| `cleanExisting` | boolean | ❌ | Clean existing labels first (default: true) |
| `userAgent` | string | ❌ | Custom user agent string |

## 🔑 GitHub Token Setup

### Recommended: Fine-grained Personal Access Token

1. Go to [GitHub Settings → Developer settings → Personal access tokens → Fine-grained tokens](https://github.com/settings/personal-access-tokens/new)
2. Click **"Generate new token"**
3. Configure:
   - **Repository access**: Select specific repositories
   - **Permissions**: Grant `Issues` (read and write) and `Metadata` (read) permissions
4. Copy the generated token

### Alternative: Classic Personal Access Token

1. Visit [GitHub Settings → Developer settings → Personal access tokens → Tokens (classic)](https://github.com/settings/tokens)
2. Click **"Generate new token (classic)"**
3. Select `repo` scope
4. Copy the generated token

> 💡 **Pro tip**: Fine-grained tokens are more secure as they provide repository-specific access and granular permissions.

## 📦 Why Bun?

- ⚡ **Lightning Fast** - 3-4x faster than Node.js
- 🔋 **Built-in Everything** - No extra configuration needed
- 🎯 **Simple** - One command to rule them all

## 🛠️ Development

```bash
# Install dependencies
bun install

# Run tests
bun test

# Run example
bun run example.js
```

## 📄 License

MIT License

---

**Run with Bun, make label management simple!** 🚀