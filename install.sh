#!/bin/bash
# Claude Code Installation Script
# Usage: curl -fsSL https://claude.ai/install.sh | bash

set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Configuration
INSTALL_DIR="${INSTALL_DIR:-$HOME/.claude}"
BIN_DIR="${BIN_DIR:-$HOME/.local/bin}"
GITHUB_REPO="anthropics/claude-code"
BINARY_NAME="claude"

# Utility functions
info() {
    echo -e "${GREEN}[INFO]${NC} $1"
}

warn() {
    echo -e "${YELLOW}[WARN]${NC} $1"
}

error() {
    echo -e "${RED}[ERROR]${NC} $1"
    exit 1
}

# Detect OS and architecture
detect_platform() {
    local os=$(uname -s | tr '[:upper:]' '[:lower:]')
    local arch=$(uname -m)

    case "$os" in
        linux*)
            OS="linux"
            ;;
        darwin*)
            OS="darwin"
            ;;
        msys*|mingw*|cygwin*)
            OS="windows"
            ;;
        *)
            error "Unsupported operating system: $os"
            ;;
    esac

    case "$arch" in
        x86_64|amd64)
            ARCH="x86_64"
            ;;
        aarch64|arm64)
            ARCH="aarch64"
            ;;
        armv7l)
            ARCH="armv7"
            ;;
        *)
            error "Unsupported architecture: $arch"
            ;;
    esac

    info "Detected platform: $OS-$ARCH"
}

# Get latest release version
get_latest_version() {
    info "Fetching latest version..."

    if command -v curl >/dev/null 2>&1; then
        LATEST_VERSION=$(curl -fsSL "https://api.github.com/repos/$GITHUB_REPO/releases/latest" | grep '"tag_name":' | sed -E 's/.*"([^"]+)".*/\1/')
    elif command -v wget >/dev/null 2>&1; then
        LATEST_VERSION=$(wget -qO- "https://api.github.com/repos/$GITHUB_REPO/releases/latest" | grep '"tag_name":' | sed -E 's/.*"([^"]+)".*/\1/')
    else
        error "curl or wget is required"
    fi

    if [ -z "$LATEST_VERSION" ]; then
        error "Failed to fetch latest version"
    fi

    info "Latest version: $LATEST_VERSION"
}

# Download and install binary
download_and_install() {
    local download_url="https://github.com/$GITHUB_REPO/releases/download/$LATEST_VERSION/claude-code-$OS-$ARCH.tar.gz"
    local tmp_dir=$(mktemp -d)

    info "Downloading from $download_url..."

    if command -v curl >/dev/null 2>&1; then
        curl -fsSL "$download_url" -o "$tmp_dir/claude-code.tar.gz"
    elif command -v wget >/dev/null 2>&1; then
        wget -q "$download_url" -O "$tmp_dir/claude-code.tar.gz"
    fi

    info "Extracting archive..."
    tar -xzf "$tmp_dir/claude-code.tar.gz" -C "$tmp_dir"

    # Create installation directories
    mkdir -p "$INSTALL_DIR"
    mkdir -p "$BIN_DIR"

    # Move binary to install location
    info "Installing to $INSTALL_DIR..."
    mv "$tmp_dir/$BINARY_NAME" "$INSTALL_DIR/$BINARY_NAME"
    chmod +x "$INSTALL_DIR/$BINARY_NAME"

    # Create symlink in bin directory
    ln -sf "$INSTALL_DIR/$BINARY_NAME" "$BIN_DIR/$BINARY_NAME"

    # Cleanup
    rm -rf "$tmp_dir"

    info "Installation complete!"
}

# Check if directory is in PATH
check_path() {
    if [[ ":$PATH:" != *":$BIN_DIR:"* ]]; then
        warn "$BIN_DIR is not in your PATH"
        echo ""
        echo "Add the following to your shell profile (~/.bashrc, ~/.zshrc, etc.):"
        echo ""
        echo "    export PATH=\"\$PATH:$BIN_DIR\""
        echo ""
    fi
}

# Verify installation
verify_installation() {
    if [ -x "$BIN_DIR/$BINARY_NAME" ]; then
        local version=$("$BIN_DIR/$BINARY_NAME" --version 2>/dev/null || echo "unknown")
        info "Claude Code installed successfully! Version: $version"
        echo ""
        echo "Run 'claude --help' to get started"
        return 0
    else
        error "Installation verification failed"
        return 1
    fi
}

# Main installation flow
main() {
    echo ""
    echo "═══════════════════════════════════════════"
    echo "  Claude Code Installation Script"
    echo "═══════════════════════════════════════════"
    echo ""

    # Check for required commands
    if ! command -v tar >/dev/null 2>&1; then
        error "tar is required but not installed"
    fi

    detect_platform
    get_latest_version
    download_and_install
    verify_installation
    check_path

    echo ""
    echo "═══════════════════════════════════════════"
    echo "  Installation Complete!"
    echo "═══════════════════════════════════════════"
    echo ""
}

# Run main function
main
