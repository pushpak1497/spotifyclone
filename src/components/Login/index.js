import {Component} from 'react'
import Cookies from 'js-cookie'
import {Redirect} from 'react-router-dom'
import './index.css'

class Login extends Component {
  state = {username: '', password: '', errorMsg: '', showError: false}

  onChangeUsername = event => {
    this.setState({
      username: event.target.value,
    })
  }

  onChangePassword = event => {
    this.setState({
      password: event.target.value,
    })
  }

  onSuccess = jwtToken => {
    Cookies.set('jwt_token', jwtToken, {expires: 30})
    const {history} = this.props
    history.replace('/')
  }

  onFailure = errorMsg => {
    this.setState({
      errorMsg,
      showError: true,
    })
  }

  onSubmitForm = async event => {
    event.preventDefault()
    const {username, password} = this.state
    const userDetails = {username, password}

    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }

    const response = await fetch('https://apis.ccbp.in/login', options)
    const data = await response.json()
    if (response.ok) {
      this.onSuccess(data.jwt_token)
    } else {
      this.onFailure(data.error_msg)
    }
  }

  render() {
    const {username, password, showError, errorMsg} = this.state
    const jwtToken = Cookies.get('jwt_token')
    if (jwtToken !== undefined) {
      return <Redirect to="/" />
    }

    return (
      <div className="bg-container">
        <div className="card">
          <img
            src="https://res.cloudinary.com/dfhjlaswm/image/upload/v1711779840/login-musicicon_ipktlk.png"
            alt="login website logo"
            className="image-login"
          />
          <h1 className="heading">Spotify Remix</h1>
          <form className="form-container" onSubmit={this.onSubmitForm}>
            <label htmlFor="username" className="label-text">
              USERNAME
            </label>
            <input
              id="username"
              type="text"
              value={username}
              onChange={this.onChangeUsername}
              className="input"
            />
            <label htmlFor="password" className="label-text">
              PASSWORD
            </label>
            <input
              id="password"
              type="password"
              className="input"
              value={password}
              onChange={this.onChangePassword}
            />
            <button type="submit" className="button">
              LOGIN
            </button>
            {showError && <p className="error-msg">*{errorMsg}</p>}
          </form>
        </div>
      </div>
    )
  }
}
export default Login
