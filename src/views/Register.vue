<template>
  <div class="register">
    <div class="container">
      <div class="row">
        <div class="col-md-4"></div>
        <transition name="slide-fade" mode="out-in" appear>
        <div class="col-md-4 account-box">
          <form>
            <h2>Type Of Account</h2>
            <div class="form-check-inline">
              <div class="form-check">
                <i class="fas fa-user-shield"></i>
                <button
                  type="submit"
                  class="btn btn-dark"
                  formaction="/admin/register-admin"
                >
                  Admin
                </button>
              </div>
              <div class="form-check">
                <i class="fas fa-user-graduate"></i>
                <button
                  type="submit"
                  class="btn btn-dark"
                  formaction="/admin/register-student"
                >
                  Student
                </button>
              </div>
            </div>
          </form>
        </div>
        </transition>
        <div class="col-md-4"></div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Registar"
};
</script>

<style lang="scss">
.register {
  .account-box {
    background-color: #fff;
    padding: 20px;
    box-shadow: 0 0 10px #3f3c3c85;
    position: relative;
    text-align: center;
    margin-top: 12rem;
    border-radius: 1rem;
    h3 {
      text-align: center;
      margin-bottom: 1.5rem;
    }
    .fa-user-shield {
      font-size: 4rem;
      margin-top: 1rem;
    }
    .fa-user-graduate {
      font-size: 4rem;
      margin-top: 1rem;
    }
    .form-check {
      text-align: center;
    }
    .btn {
      border-radius: 2rem;
      width: 73%;
      border: none;
      margin-bottom: 2.5rem;
      padding: 0.7rem;
      font-weight: bolder;
      margin-top: 2rem;
      align-items: center;
      color: #fff;
      transition: all 0.3s;
      position: relative;
      overflow: hidden;
      z-index: 1;
      &:after {
        content: "";
        position: absolute;
        bottom: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: #343a40;
        z-index: -2;
      }
      &:before {
        content: "";
        position: absolute;
        bottom: 0;
        left: 0;
        width: 0%;
        height: 100%;
        background-color: darken(#343a40, 15%);
        transition: all 0.3s;
        z-index: -1;
      }
      &:hover {
        color: #fff;
        &:before {
          width: 100%;
        }
      }
    }
  }
}
</style>
