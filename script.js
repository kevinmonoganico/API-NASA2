let currentPage = 1;

const apiKey = "tgcddEt7Az7HRuEa3KOA1ECfBVh4eTCuKlwCedXp"; 

async function marsFotosV1(page) {
    const baseUrlV1 = "https://api.nasa.gov/mars-photos/api/v1";
    const endPoint = "rovers/curiosity/photos";
    const params = `?api_key=${apiKey}&sol=1000&page=${page}`;
    const url = `${baseUrlV1}/${endPoint}${params}`;

    try {
        const response = await fetch(url);

        if (!response.ok) {
            throw new Error(`Erro na requisição: ${response.status}`);
        }

        const data = await response.json();

        if (data.photos.length === 0) {
            console.log("Nenhuma foto encontrada.");
            displayNoPhotosMessage();
            return;
        }

        displayPhotos(data.photos);
    } catch (error) {   
        console.error("Erro ao buscar fotos:", error);
        displayErrorMessage(error.message);
    }
}

function displayPhotos(photos) {
    const container = document.getElementById('fotos-container');
    container.innerHTML = "";

    photos.forEach(photo => {
        const imgElement = document.createElement('img');
        imgElement.src = photo.img_src;
        imgElement.alt = `Foto tirada pela câmera ${photo.camera.full_name} no dia ${photo.earth_date}`;
        imgElement.style.width = "200px";
        imgElement.style.margin = "10px";

        container.appendChild(imgElement);
    });
}

function displayNoPhotosMessage() {
    const container = document.getElementById('fotos-container');
    container.innerHTML = "<p>Nenhuma foto disponível para esta página.</p>";
}

function displayErrorMessage(message) {
    const container = document.getElementById('fotos-container');
    container.innerHTML = `<p>Erro: ${message}</p>`;
}

window.onload = () => {
   

    // Carrega as fotos iniciais
    marsFotosV1(currentPage);

    // Adiciona o evento ao botão para carregar a próxima página de fotos
    document.getElementById('next-button').addEventListener('click', () => {
        currentPage++;
        marsFotosV1(currentPage);
    });
};

