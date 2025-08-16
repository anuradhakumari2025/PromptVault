import "./Settings.css"
function Settings() {
  return (
    <div className="settings-page">
      <h1 className="settings-title">Settings</h1>

      <form className="settings-form">
        {/* Profile Info */}
        <div className="form-group">
          <label htmlFor="name">Full Name</label>
          <input type="text" id="name" placeholder="Enter your name" />
        </div>

        <div className="form-group">
          <label htmlFor="email">Email Address</label>
          <input type="email" id="email" placeholder="Enter your email" />
        </div>

        {/* Password */}
        <div className="form-group">
          <label htmlFor="password">New Password</label>
          <input type="password" id="password" placeholder="Enter new password" />
        </div>

        <div className="form-group">
          <label htmlFor="confirmPassword">Confirm Password</label>
          <input type="password" id="confirmPassword" placeholder="Re-enter password" />
        </div>

        {/* Save button */}
        <button type="submit" className="save-btn">Save Changes</button>
      </form>
    </div>
  );
}

export default Settings;
