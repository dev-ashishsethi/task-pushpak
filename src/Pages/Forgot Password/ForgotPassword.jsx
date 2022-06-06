import logo from "../../assets/logo/logo.png";
export function ForgotPassword() {
  return (
    <div className="h-100 d-flex flex-column align-items-center justify-content-start gap-4">
      <img src={logo} alt="" />
      <h1>Forgot Password?</h1>
      <label htmlFor="">Enter Email</label>
      <input type="text" name="" id="" />

      <button className="btn btn-primary">Submit</button>
    </div>
  );
}
