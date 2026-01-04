# Contributing to Claude Code Install Script

Thank you for your interest in contributing to the Claude Code installation script!

## Reporting Issues

If you encounter problems with the installation script, please:

1. Check the [troubleshooting section](README.md#troubleshooting) in the README
2. Search existing [issues](https://github.com/anthropics/claude-code/issues)
3. Open a new issue with:
   - Your OS and architecture
   - The error message you received
   - Steps to reproduce the problem

## Submitting Changes

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/your-feature-name`
3. Make your changes
4. Test the script on your platform
5. Commit with a descriptive message
6. Push to your fork
7. Open a Pull Request

## Testing the Script

Before submitting changes, test the script:

```bash
# Test with default settings
bash install.sh

# Test with custom directories
INSTALL_DIR="/tmp/test-claude" BIN_DIR="/tmp/test-bin" bash install.sh
```

## Code Style

- Use 4 spaces for indentation
- Follow existing naming conventions
- Add comments for complex logic
- Keep functions focused and single-purpose

## Adding Platform Support

To add support for a new platform:

1. Update the `detect_platform()` function
2. Ensure the platform is documented in README.md
3. Test on the actual platform if possible

## Questions?

Feel free to open an issue for questions or discussion about potential changes.
