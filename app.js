let dataFilm = [];
fetch('/dataFilm.json')
  .then((response) => {
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    // Cek apakah respons berupa JSON
    const contentType = response.headers.get('content-type');
    if (!contentType || !contentType.includes('application/json')) {
      throw new Error('Did not receive JSON');
    }
    return response.json();
  })
  .then((data) => {
    dataFilm = data;
    tampilkanDataFilm(dataFilm);
  })
  .catch((error) => {
    console.error('Error fetching the JSON file:', error);
  });

const cardFilmContainer = document.querySelector('.film-wrapper');
const versiFilmContainer = document.querySelector('.versi-film');

const buatKategoriSection = (judulKategori) => {
  return `
    <section class="garis-metode">
        <section class="garis"></section>
        <h3>${judulKategori}</h3>
        <section class="garis"></section>
    </section>
  `;
};

const buatFilmElement = (film) => {
  return `
    <section class="card-film">
        <section class="review-icon">
          <i class="fa-regular fa-eye"></i>
          <h6 class="overlay-review">Baca Review</h6>
        </section>
        <section class="thumbnail" style="background-image: url('${film.poster || 'img/default.jpg'}');"></section>
        <section class="card-content">
          <section class="card-tittle">
              <h5>${film.sutradara}</h5>
              <h6 class="tag">${film.durasi}</h6>
          </section>
          <h3>${film.judul}</h3>
        </section>
        <section class="review-wrapper">
          <section class="review">
              ${tampilkanBintang(film.bintang)}
          </section>
          <h5>${film.bulan + ' ' + film.tahun}</h5>
        </section>
    </section>
  `;
};

const tampilkanDataFilm = (semuaFilm) => {
  const filmBaru = semuaFilm.filter((film) => film.tahun >= 2024);
  const filmLama = semuaFilm.filter((film) => film.tahun < 2024);

  cardFilmContainer.innerHTML = '';
  versiFilmContainer.innerHTML = '';

  if (filmBaru.length > 0) {
    versiFilmContainer.innerHTML += buatKategoriSection('Trending');

    const wrapperBaru = document.createElement('div');
    wrapperBaru.classList.add('film-wrapper');
    filmBaru.forEach((film) => {
      const filmElement = buatFilmElement(film);
      wrapperBaru.innerHTML += filmElement;
    });

    versiFilmContainer.appendChild(wrapperBaru);
  }
  if (filmLama.length > 0) {
    versiFilmContainer.innerHTML += buatKategoriSection('Latest');

    const wrapperLama = document.createElement('div');
    wrapperLama.classList.add('film-wrapper');
    filmLama.forEach((film) => {
      const filmElement = buatFilmElement(film);
      wrapperLama.innerHTML += filmElement;
    });
    versiFilmContainer.appendChild(wrapperLama);
  }
};

function filterFilm() {
  versiFilmContainer.innerHTML = '';
  const input = document.getElementById('search-input').value;
  cardFilmContainer.innerHTML = '';
  if (input !== '') {
    const filter = dataFilm.filter((film) => {
      versiFilmContainer.innerHTML = buatKategoriSection('Hasil Pencarian');
      return film.judul.toUpperCase().includes(input.toUpperCase());
    });

    if (filter.length > 0) {
      const wrapperHasilCari = document.createElement('div');
      wrapperHasilCari.classList.add('film-wrapper');

      filter.forEach((film) => {
        const filmElement = buatFilmElement(film);
        wrapperHasilCari.innerHTML += filmElement;
      });
      versiFilmContainer.appendChild(wrapperHasilCari);
    } else {
      const filmKosong = `
      <section class="tidak-tersedia">
        <img src="img/notfound.jpg" alt="Not Found"/>
      </section>
      `;
      cardFilmContainer.innerHTML = filmKosong;
    }
  } else {
    tampilkanDataFilm(dataFilm);
  }
}

const searchInput = document.getElementById('search-input');
searchInput.addEventListener('input', function () {
  filterFilm();
});

const totalBintang = 5;
const tampilkanBintang = (bintang) => {
  let bintangElement = '';
  for (let i = 1; i <= totalBintang; i++) {
    bintangElement += `<span class="fa fa-star ${i <= bintang ? 'checked' : ''}"></span>`;
  }
  return bintangElement;
};

const menuToggle = document.querySelector('.menu-toggle input');
const nav = document.querySelector('.navdiv');

menuToggle.addEventListener('click', function () {
  nav.classList.toggle('slide');
});

window.addEventListener('scroll', function () {
  var nav = document.querySelector('nav');
  var logo = document.querySelector('nav .nav-container .logo a img');
  var navLinks = document.querySelectorAll('.navdiv ul li a');

  if (window.scrollY > 430) {
    nav.classList.add('scrolled');
    logo.src = 'img/VocFilmType.png';
    navLinks.forEach((link) => {
      link.style.color = '#000000';
    });
  } else {
    nav.classList.remove('scrolled');
    logo.src = 'img/VocFilmType2.png';
    navLinks.forEach((link) => {
      link.style.color = '#ffffff';
    });
  }
});
