import blured from '/images/blured.png';

export const NotFound = () => {
  return (
    <section className="not-found">
      <img src={blured} alt="blured" />
      <div className="home-title not-found__title">
        <h1>ошибка 404</h1>
        <h3>
          Извините, страницы, которую <br /> вы искали, не существует
        </h3>
        <a href={'/'} target="_self" rel="noreferrer">
          <span>На главную</span>
        </a>
      </div>
    </section>
  );
};
