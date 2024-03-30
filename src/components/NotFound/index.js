import './index.css'

import Header from '../../Header'

const NotFound = () => (
  <div className="not-found-app-container">
    <Header />
    <div className="not-found-container">
      <div className="back-button-container">
        <img
          src="https://res.cloudinary.com/dfhjlaswm/image/upload/v1711792684/arrow_backback_zuxbzb.png"
          alt="back"
        />
        <p>Back</p>
      </div>
      <div className="text-not-found-container">
        <h1 className="heading-not-found">404</h1>
        <p className="text-not-found">Page Not Found</p>
      </div>
    </div>
  </div>
)
export default NotFound
