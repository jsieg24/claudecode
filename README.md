# Claude Code Installation Script

This repository contains the official installation script for Claude Code.

## Quick Install

```bash
curl -fsSL https://claude.ai/install.sh | bash
```

## What It Does

The installation script:

1. **Detects your platform** - Automatically identifies your OS (Linux, macOS, Windows) and architecture (x86_64, aarch64, armv7)
2. **Downloads the latest release** - Fetches the latest Claude Code binary from GitHub releases
3. **Installs to `~/.claude`** - Places the binary in a standard location
4. **Creates a symlink** - Adds a symlink in `~/.local/bin` for easy access
5. **Verifies installation** - Confirms the installation was successful

## Custom Installation

You can customize the installation by setting environment variables:

```bash
# Install to a custom directory
INSTALL_DIR="$HOME/custom/path" BIN_DIR="$HOME/bin" \
  curl -fsSL https://claude.ai/install.sh | bash
```

### Environment Variables

- `INSTALL_DIR` - Directory where Claude Code will be installed (default: `~/.claude`)
- `BIN_DIR` - Directory where the symlink will be created (default: `~/.local/bin`)

## Manual Installation

If you prefer to install manually:

1. Download the appropriate binary for your platform from [releases](https://github.com/anthropics/claude-code/releases)
2. Extract the archive: `tar -xzf claude-code-*.tar.gz`
3. Move the binary to your preferred location: `mv claude ~/.local/bin/`
4. Make it executable: `chmod +x ~/.local/bin/claude`

## Requirements

- `curl` or `wget` for downloading
- `tar` for extracting archives
- Bash shell

## Supported Platforms

- **Linux**: x86_64, aarch64, armv7
- **macOS**: x86_64 (Intel), aarch64 (Apple Silicon)
- **Windows**: x86_64 (via Git Bash, WSL, or similar)

## Troubleshooting

### Script fails to download

Ensure you have `curl` or `wget` installed:

```bash
# On Debian/Ubuntu
sudo apt-get install curl

# On macOS
brew install curl
```

### Binary not found after installation

Make sure `~/.local/bin` is in your PATH:

```bash
echo 'export PATH="$PATH:$HOME/.local/bin"' >> ~/.bashrc
source ~/.bashrc
```

For zsh users, add to `~/.zshrc` instead.

### Permission denied

Ensure the script has execute permissions:

```bash
chmod +x install.sh
./install.sh
```

## Uninstall

To remove Claude Code:

```bash
rm -rf ~/.claude
rm ~/.local/bin/claude
```

## Security

The installation script:

- Downloads only from official GitHub releases
- Verifies the platform before downloading
- Uses secure HTTPS connections
- Can be reviewed before execution

To review the script before running:

```bash
curl -fsSL https://claude.ai/install.sh
```

## License

See the main [Claude Code repository](https://github.com/anthropics/claude-code) for license information.
