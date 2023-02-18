//This JavaScript code fetches weather and location data using the OpenWeatherMap API and displays it on a web page.

// Wait for the page to load
window.addEventListener
(
    "load", () =>
    {
        // Initialize variables
        let long;
        let lat;
        const temperatureDescription = document.querySelector('.temperature-description');
        const temperatureDegree = document.querySelector('.temperature-degree');
        const locationName = document.querySelector('.location-name');
        const temperatureSection = document.querySelector('.temperature');
        const temperatureSpan = document.querySelector('.temperature span');
        
        // Check if geolocation is available
        if (navigator.geolocation)
        {
            // Get current position
            navigator.geolocation.getCurrentPosition
            (
                position =>
                {
                    long = position.coords.longitude;
                    lat = position.coords.latitude;
                    
                    // Construct API URLs
                    const weatherApiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=6ea4044b50624378188f265e217ebc2e&units=metric&lang=en`;
                    const locationApiUrl = `https://api.openweathermap.org/geo/1.0/reverse?lat=${lat}&lon=${long}&appid=6ea4044b50624378188f265e217ebc2e`;
                    
                    // Fetch weather data
                    fetch(weatherApiUrl)
                        .then(response => response.json())
                        .then
                        (
                            data =>
                            {
                                const temperature = data.main.temp.toFixed(1);
                                const description = data.weather[0].description;
                                const fahrenheit = (temperature * 1.8) + 32;
                                const icon = data.weather[0].icon;
                                const collection = document.getElementsByClassName('icon');

                                //Map weather icons to background images
                                const backgrounds = 
                                {
                                    '01d': 'https://images.pexels.com/photos/281260/pexels-photo-281260.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
                                    '02d': 'https://wallpaper.dog/large/17206596.jpg',
                                    '03d': 'https://i.pinimg.com/originals/7d/bc/70/7dbc70f7a6e4c8c37bba6d44b4babda9.jpg',
                                    '04d': 'https://c0.wallpaperflare.com/preview/886/295/581/clouds-cloudscape-sky-skyscape.jpg',
                                    '09d': 'https://www.rochesterfirst.com/wp-content/uploads/sites/66/2021/04/rain-drops-on-window-1827098_1920.jpg?strip=1',
                                    '10d': 'https://webneel.com/wallpaper/sites/default/files/images/10-2017/4-rain-wallpaper-rainy.jpg',
                                    '11d': 'https://images.hdqwalls.com/download/thunderstorm-01-1920x1080.jpg',
                                    '13d': 'https://i.pinimg.com/originals/20/88/6c/20886ce215a8179b115f9675af93e2aa.jpg',
                                    '50d': 'https://wallpapercave.com/wp/wp4155376.jpg'
                                };
                    
                                temperatureDegree.textContent = temperature;
                                temperatureDescription.textContent = description;
                                
                                // Set background image based on weather conditions
                                for (let [key, value] of Object.entries(backgrounds))
                                {
                                    if (icon === key)
                                    {
                                        collection[0].src = `https://openweathermap.org/img/wn/${icon}@2x.png`;
                                        document.body.style.backgroundImage = `url('${value}')`;
                                        break;
                                    }
                                }
                    
                                // Toggle temperature units
                                temperatureSection.addEventListener
                                (
                                    'click', () =>
                                    {
                                        if (temperatureSpan.textContent === "C")
                                        {
                                            temperatureSpan.textContent = "F";
                                            temperatureDegree.textContent = fahrenheit.toFixed(1);
                                        }
                                        
                                        else
                                        {
                                            temperatureSpan.textContent = "C";
                                            temperatureDegree.textContent = temperature;
                                        }
                                    }
                                );
                            }
                        );
                    
                    // Fetch location data
                    fetch(locationApiUrl)
                    .then(response => response.json())
                    .then
                    (
                        data =>
                        {
                            const name = data[0].local_names.en;locationName.textContent = name;
                        }
                    );
                }
            );
        }
    }
);