//LOGIN
document.getElementById("authForm").addEventListener("submit", function (e) {
    e.preventDefault();
  
    const loginEmail = document.getElementById("loginEmail").value;
    const loginPassword = document.getElementById("loginPassword").value;
  
    const data = {
      email: loginEmail,
      password: loginPassword,
    };
  
    fetch("https://ets-pemrograman-web-f.cyclic.app/users/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.status === "success") {
          const accessToken = data.data.access_token;
  
          alert("Login berhasil!");
  
          window.location.href = "app.html";
        } else {
          alert("Login failed. Check your email and password!");
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  });
  
  // Register
  
  const registerButton = document.getElementById("registerButton");
  const registerName = document.getElementById("registerName");
  const registerEmail = document.getElementById("registerEmail");
  const registerPassword = document.getElementById("registerPassword");
  const authForm = document.getElementById("authForm");
  
  authForm.addEventListener("submit", function (e) {
    e.preventDefault();
  
    const userData = {
      nama: registerName.value,
      email: registerEmail.value,
      password: registerPassword.value,
    };
  
    fetch("https://ets-pemrograman-web-f.cyclic.app/users/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.status === "failed") {
          alert(data.error);
        } else {
          window.location.href = "index.html";
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  });
  // USERS
  