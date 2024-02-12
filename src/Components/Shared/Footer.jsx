const year = new Date().getFullYear();

const Footer = () => (
  <section className="bg-secondary text-white footer">
    <div className="d-flex flex-column flex-md-row text-center text-md-start justify-content-between container-lg py-3">
      <div className="mb-3 mb-md-0">
        Copyright © {year}. All rights reserved.
      </div>
      <div className="d-flex">
        <div>
          By MIHIR KADVE
        </div>
      </div>
    </div>
  </section>
);

export default Footer;
