# Next.js Photo Gallery

This is a simple and responsive photo gallery application built with Next.js and Tailwind CSS. The gallery fetches curated photos from the Pexels API and displays them in a Masonry layout.

## Features

- **Responsive Design**: The gallery adapts to different screen sizes, displaying images in a grid layout.
- **Infinite Scroll**: Automatically loads more photos as the user scrolls down.
- **Skeleton Loading**: Displays a loading skeleton while images are being fetched.
- **Masonry Layout**: Images are displayed in a staggered grid layout, providing a visually appealing presentation.

## Technologies Used

- [Next.js](https://nextjs.org/)
- [React](https://reactjs.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Pexels API](https://www.pexels.com/api/)

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/ergashev2000/auto-fetching.git
   cd auto-fetching
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env.local` file in the root directory and add your Pexels API key:
   ```plaintext
   PEXELS_API_KEY=your_api_key_here
   ```

4. Start the development server:
   ```bash
   npm run dev
   ```

5. Open your browser and navigate to `http://localhost:3000`.

## Usage

- The gallery will display a set of curated photos from Pexels.
- As you scroll down, more photos will automatically load.
- Each photo will show a skeleton loader while it is being fetched.

## Components

### PhotoGallery

- Displays the main gallery of photos.
- Fetches photos from the Pexels API.
- Implements infinite scrolling.

### BlurImage

- Handles the display of individual images.
- Shows a skeleton loader while the image is loading.

## Contributing

Contributions are welcome! Please feel free to submit a pull request or open an issue.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
