document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('dogForm');
    const breedsSelect = document.getElementById('breeds');
    const imageCountInput = document.getElementById('imageCount');
    const dogImagesContainer = document.getElementById('dogImages');

    // Fetch dog breeds and populate the dropdown
    fetch('https://dog.ceo/api/breeds/list/all')
        .then(response => response.json())
        .then(data => {
            const breeds = Object.keys(data.message);
            breeds.forEach(breed => {
                const option = document.createElement('option');
                option.value = breed;
                option.textContent = breed;
                breedsSelect.appendChild(option);
            });
        });

    form.addEventListener('submit', (event) => {
        event.preventDefault();

        const selectedBreed = breedsSelect.value;
        const imageCount = imageCountInput.value;

        // Fetch images for the selected breed
        fetch(`https://dog.ceo/api/breed/${selectedBreed}/images/random/${imageCount}`)
            .then(response => response.json())
            .then(data => {
                // Clear previous images
                dogImagesContainer.innerHTML = '';

                // Display new images
                data.message.forEach(imageUrl => {
                    const img = document.createElement('img');
                    img.src = imageUrl;
                    dogImagesContainer.appendChild(img);
                });
            });
    });
});
