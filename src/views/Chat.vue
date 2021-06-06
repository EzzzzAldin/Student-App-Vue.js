<template>
  <div class="">
    <div class="container">
      <div class="row">
        <div class="col-md-3"></div>
        <transition name="slide-fade" mode="out-in" appear>
        <div class="col-md-6 msg-box">
          <div class="chat-page">
            <div class="msg-inbox">
              <div class="chats">
                <div class="msg-page">
                  <div
                    class="msg alert alert-dark"
                    role="alert"
                    :key="message"
                    v-for="message in msgs"
                  >
                  <transition name="slide-fade" mode="out-in" appear>
                    <span
                      class="mx-auto d-block rounded-circle border border-dark mt-3"
                      style="height: 2.5rem;width: 2.5rem;background-color: rgba(28, 62, 253, 0.2);color: rgb(63, 59, 82);padding: 0.6rem;font-size: 0.9rem;float: right;"
                      >{{ message.name }}</span
                    >
                  </transition>
                  <transition name="slide-fade" mode="out-in" appear>
                    <p>
                      {{ message.msg }}
                    </p>
                  </transition>
                  </div>
                </div>
                <form @submit.prevent="sendMessage">
                  <div class="input-group mb-3 mt-5">
                    <input
                      type="text"
                      class="form-control"
                      placeholder="write message"
                      aria-label="write message"
                      aria-describedby="basic-addon2"
                      v-model="msgText"
                    />
                    <button type="submit" class="btn btn-dark">
                      Send
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
        </transition>
        <div class="col-md-6"></div>
      </div>
    </div>
  </div>
</template>

<script>
import io from "socket.io-client";
import axios from "axios";

export default {
  name: "Chat",
  data: function() {
    return {
      socket: io("localhost:3000", {
        transports: ["websocket"],
        rejectUnauthorized: false,
      }),
      msgText: "",
      msgs: [],
      name: "",
      nameLogo: "",
      room: "general",
    };
  },
  mounted() {
    this.socket.on("clientMsg", (data) => {
      this.msgs.push(data);
    });
  },
  methods: {
    sendMessage(e) {
      e.preventDefault();
      this.socket.emit("newMsg", this.msgText, this.room, this.nameLogo);
      const object = {
        name: this.nameLogo,
        msg: this.msgText,
      };
      this.msgs.push(object);
      this.msgText = "";
    },
  },
  async created() {
    try {
      this.socket.emit("joinRoom", this.room);
      const token = await localStorage.getItem("token");
      const response = await axios.get(
        "http://127.0.0.1:3000/admin/data-admin",
        {
          headers: {
            token: token,
          },
        }
      );
      // If User student
      const response2 = await axios.get(
        "http://127.0.0.1:3000/student/genral-data",
        {
          headers: {
            token: token,
          },
        }
      );
      this.name = response.data.name || response2.data.name;
      this.nameLogo = this.name.slice(0, 2).toUpperCase();
      // this.status = response.data.status;
    } catch (error) {
      this.error = error.response.data;
      console.log(error);
    }
  },
};
</script>

<style lang="scss" scoped>
.msg-box {
  margin-top: 1rem;
  background-color: #fff;
  position: relative;
  padding: 0;
  height: 40rem;
  border-radius: 3rem;
  .chat-page {
    padding: 0 0 50px 0;
    .msg-inbox {
      overflow: hidden;
      .chats {
        padding: 1rem;
        .msg-page {
          height: 40rem;
          overflow-y: auto;
          .msg {
            margin-top: 2rem;
            border-radius: 1rem;
            text-align: right;
            p {
              margin-right: 4rem;
              margin-top: 0.5rem;
              font-size: 1.2rem;
              font-weight: 700;
            }
          }
        }
      }
    }
  }
}
input {
  text-align: right;
}
</style>
