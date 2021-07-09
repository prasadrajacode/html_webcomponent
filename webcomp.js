const template = document.createElement('template');
template.innerHTML = `
<style>
.card {
    box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2);
    transition: 0.3s;
    width: 200px;
  }
  
  .card:hover {
    box-shadow: 0 8px 16px 0 rgba(0,0,0,0.2);
  }
  
  .container {
    padding: 2px 16px;
  }

  .profileImg{
      height: 50px;
      width: 50px;
      margin:20px;
  }
  .addInfo{
      display: none;  
  }
  #btnShowInfo{
      margin: 10px;
  }
</style>
<div class="card">
  <img class="profileImg" alt="Avatar">
  <div class="container">
    <h4 id='userName'><b></b></h4> 
    <p class='userProfession'></p> 
    <div class='addInfo'>
         <p class='userAddress'><slot name="useraddress" /></p>
         <p class='userEmail'><slot name="useremail" /></p>
    </div>
    <button id='btnShowInfo'type="button">Show Info</button>
  </div>
</div>
`;

class UserCard extends HTMLElement {
    constructor() {
        super();
        this.showInfo = false;
        this.attachShadow({ mode: 'open' });
    }

    toggleInfo() {
        this.showInfo = !this.showInfo;
        const info = this.shadowRoot.querySelector('.addInfo');
        const toggleBtn = this.shadowRoot.querySelector('#btnShowInfo');
        if (this.showInfo) {
            info.style.display = 'block';
            toggleBtn.innerText = 'Hide Info';
        } else {
            info.style.display = 'none';
            toggleBtn.innerText = 'Show Info';
        }
    }

    connectedCallback() {
        //http calls are triggred from here
        this.shadowRoot.appendChild(template.content.cloneNode(true));
        this.shadowRoot.querySelector('#userName').innerText = this.getAttribute('name');
        this.shadowRoot.querySelector('.userProfession').innerText = this.getAttribute('profession');
        this.shadowRoot.querySelector('img').src = this.getAttribute('avatar');
        this.shadowRoot.querySelector('#btnShowInfo').addEventListener('click', () => this.toggleInfo());
    }
    disconnectedCallback() {
        this.shadowRoot.querySelector('#btnShowInfo').removeEventListener();
    }
}

window.customElements.define('user-card', UserCard);