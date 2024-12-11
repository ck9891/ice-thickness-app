# Ice Fishing Safety App

## Project Description

This project is a web application designed to help ice fishing enthusiasts safely determine the thickness of ice on a lake. Users can plot points on a map to indicate the thickness of the ice at specific locations and share this information with others. The application supports user authentication, data aggregation, and offline functionality.

## Features

- Plot points on a map to indicate ice thickness
- User authentication with JWT
- Store ice thickness data with timestamps
- Aggregate data on a monthly and yearly basis
- Display historical data using charts
- Responsive design for phones
- Offline functionality with data synchronization

## Setup Instructions

1. Clone the repository:
   ```
   git clone https://github.com/githubnext/workspace-blank.git
   cd workspace-blank
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Set up Prisma:
   ```
   npx prisma init
   npx prisma generate
   ```

4. Configure the database connection in `prisma/.env`.

5. Run the development server:
   ```
   npm run dev
   ```

## Usage Instructions

1. Open the web application in your browser.

2. Register a new user account or log in with an existing account.

3. Use the map to plot points and input ice thickness data.

4. View aggregated ice thickness data and historical charts.

5. Use the application offline and sync data when the internet connection is restored.

## Examples

- Plotting ice thickness data on the map
- Viewing monthly and yearly aggregated data
- Using the application offline and syncing data

## Contributing

We welcome contributions to the Ice Fishing Safety App! To contribute, please follow these steps:

1. Fork the repository.
2. Create a new branch for your feature or bugfix.
3. Make your changes and commit them with descriptive messages.
4. Push your changes to your forked repository.
5. Create a pull request to the main repository.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for more information.
