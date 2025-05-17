# YouTube Speed Controller

A Firefox extension that allows you to easily change YouTube video playback speed with customizable presets and custom speed values.

![YouTube Speed Controller Screenshot](screenshots/screenshot.png)

## Features

- Change YouTube video playback speed with a single click
- Preset speeds from 25% (0.25x) up to 400% (4.0x) in 25% intervals
- Custom speed option for precise control
- Remembers your last used speed
- Simple, lightweight interface
- Compatible with Firefox

## Installation

### Temporary Installation (for testing)

1. Download or clone this repository:
   ```
   git clone https://github.com/mprecilio20/YoutubeSpeedController.git
   ```

2. Open Firefox and type `about:debugging` in the address bar
3. Click on "This Firefox" in the left sidebar
4. Click "Load Temporary Add-on..."
5. Navigate to the repository folder and select the `manifest.json` file
6. The extension will be active until you restart Firefox

### Packaging the Extension

To create an XPI file for installation or distribution:

1. Navigate to the extension directory
   ```
   cd YoutubeSpeedController
   ```

2. Create an XPI file using the zip command:
   ```
   zip -r ../youtube-speed-controller.xpi * -x ".*" -x "__MACOSX" -x "screenshots/*"
   ```

3. The XPI file will be created in the parent directory

### Permanent Installation

1. Go to `about:addons` in Firefox
2. Click the gear icon and select "Install Add-on From File..."
3. Select the XPI file you created
4. Follow the prompts to install

## Usage

1. Navigate to any YouTube video
2. Click the YouTube Speed Controller icon in your browser toolbar
3. Select a speed from the dropdown menu, or choose "Custom..." to enter a specific value
4. Click "Apply Speed" to change the video playback rate
5. The status indicator will confirm when the speed has been set

## Development

### Project Structure

- `manifest.json` - Extension configuration
- `popup.html` - The popup UI
- `popup.js` - Controls the popup interface
- `content.js` - Communicates with YouTube pages
- `icons/` - Contains extension icons

### Building from Source

1. Clone the repository
   ```
   git clone https://github.com/mprecilio20/YoutubeSpeedController.git
   ```

2. Make your modifications to the code

3. Test using the temporary installation method above

4. Package using the zip command when ready:
   ```
   zip -r ../youtube-speed-controller.xpi * -x ".*" -x "__MACOSX" -x "screenshots/*" -x "*.md"
   ```

## Troubleshooting

### Extension Not Working?

- Make sure you're on a YouTube video page
- Check if the status shows "Connected to YouTube"
- Try refreshing the YouTube page
- Reinstall the extension

### Installation Issues

If you encounter "corrupt" errors when installing the XPI:

1. Make sure you're using the correct format:
   ```
   zip -r ../youtube-speed-controller.xpi * -x ".*" -x "__MACOSX" -x "screenshots/*" -x "*.md"
   ```
   
2. Try installing the extension temporarily via `about:debugging` instead

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- Created by [mprecilio20](https://github.com/mprecilio20)
- Inspired by YouTube's limited built-in playback speed options
