// Copyright (c) 2018, The TurtleCoin Developers
//
// Please see the included LICENSE file for more information.

var container = document.getElementById("select_identicon");
var show_new = document.getElementById("show_new_icons");

var wallets = [];

var modal = new tingle.modal({
  footer: true,
  stickyFooter: false,
  closeMethods: ['overlay', 'button', 'escape'],
  closeLabel: "Close",
});
modal.addFooterBtn('Close', 'tingle-btn tingle-btn--danger', function() {
  modal.close();
});
modal.addFooterBtn('Print', 'tingle-btn tingle-btn--primary tingle-btn--pull-right', function() {
  window.print();
});

function showLoader() {
  container.innerHTML = '';
  var loader = document.createElement("div");
  loader.className = "loading";
  container.appendChild(loader);
}

function doGenerateWallets() {
  show_new.disabled = true;
  showLoader();
  wallets = [];
  generateRandomWallet();
}

// Need to use a timeout otherwise generating many wallets
// blocks the javascript rendering
function generateRandomWallet() {
  setTimeout(function() {
    wallets.push(genkeys());
    if(wallets.length == 18)
      showWallets();
    else
      generateRandomWallet();
  }, 250);
}

function showWallets() {
  show_new.disabled = false;
  container.innerHTML = '';
  for(var i = 0; i < wallets.length; i++) {
    var icon = document.createElement("canvas");
    icon.width = 128;
    icon.height = 128;
    icon.setAttribute("data-jdenticon-value", wallets[i].keys.public_addr);
    icon.setAttribute("data-i", i);
    container.appendChild(icon);
    jdenticon.update(icon);
    icon.addEventListener("click", function(e){
      showWallet(e.target.getAttribute("data-i"));
    });
  }
}

function showWallet(i) {

  var wallet = wallets[i];

  var content = document.getElementById("modal_template").firstElementChild.cloneNode(true);

  var icon = document.createElement("canvas");
  icon.width = 128;
  icon.height = 128;
  icon.setAttribute("data-jdenticon-value", wallets[i].keys.public_addr);
  icon.setAttribute("data-i", i);
  jdenticon.update(icon);

  content.getElementsByClassName("identicon_widget")[0].appendChild(icon);

  modal.setContent(content);
  modal.open();
  
  elems = document.getElementsByClassName("address_widget");
  for(var i = 0; i < elems.length; i++)
    elems[i].innerHTML = wallet.keys.public_addr;

  elems = document.getElementsByClassName("mnemonic_widget");
  for(var i = 0; i < elems.length; i++)
    elems[i].innerHTML = wallet.mnemonic;

  elems = document.getElementsByClassName("view_key_widget");
  for(var i = 0; i < elems.length; i++)
    elems[i].innerHTML = wallet.keys.view.sec;

  elems = document.getElementsByClassName("spend_key_widget");
  for(var i = 0; i < elems.length; i++)
    elems[i].innerHTML = wallet.keys.spend.sec;
  
}

doGenerateWallets();
