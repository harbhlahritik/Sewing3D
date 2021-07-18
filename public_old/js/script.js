var firebaseConfig = {
    apiKey: "AIzaSyAdGurdAcS8w_tf1-ou0e0qzdSniXG4sAo",
    authDomain: "sewing3d-95655.firebaseapp.com",
    databaseURL: "https://sewing3d-95655.firebaseio.com",
    projectId: "sewing3d-95655",
    storageBucket: "sewing3d-95655.appspot.com",
    messagingSenderId: "237711847802",
    appId: "1:237711847802:web:fd6b4d60b73a924b3966c3",
    measurementId: "G-S2TQZPRDB2"
  };
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();

var quotationRef = firebase.database().ref('quotations');

const hamburger = document.querySelector(".hamburger");
const navLinks = document.querySelector(".nav-links");
const links = document.querySelectorAll(".nav-links li");

hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('open');
    links.forEach(link => {
        link.classList.toggle('fade');
    });
});

document.querySelectorAll('.nav-links li a').forEach(item => {
    item.addEventListener('click', event => {
        navLinks.classList.toggle('open');
        links.forEach(link => {
            link.classList.toggle('fade');
        });
    });
});

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();

        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

const slides = document.querySelectorAll('.slide');
const next = document.querySelector('#next');
const prev = document.querySelector('#prev');
const auto = false;
const intervalTime = 5000;
let slideInterval;

const nextSlide = () => {
    // Get current class
    const current = document.querySelector('.current');
    // Remove current class
    current.classList.remove('current');
    //Check for next slide
    if(current.nextElementSibling) {
        //Add current to next sibling
        current.nextElementSibling.classList.add('current');
    } else {
        //Add current to start
        slides[0].classList.add('current');
    }
    setTimeout(() => current.classList.remove('current'));
};

const prevSlide = () => {
    // Get current class
    const current = document.querySelector('.current');
    // Remove current class
    current.classList.remove('current');
    //Check for prev slide
    if(current.previousElementSibling) {
        //Add current to prev sibling
        current.previousElementSibling.classList.add('current');
    } else {
        //Add current to last
        slides[slides.length-1].classList.add('current');
    }
    setTimeout(() => current.classList.remove('current'));
};

// Button events
next.addEventListener('click', e => {
    nextSlide();
    if (auto) {
        clearInterval(slideInterval);
        slideInterval = setInterval(nextSlide, intervalTime);
    }
});

prev.addEventListener('click', e => {
    prevSlide();
    if (auto) {
        clearInterval(slideInterval);
        slideInterval = setInterval(nextSlide, intervalTime);
    }
});

// Auto slide
if (auto) {
    // Run next slide at interval time
    slideInterval = setInterval(nextSlide, intervalTime);
}

// handling contact form
document.getElementById('quotation-form').addEventListener('submit', submitForm);

// Submit form
function submitForm(e) {
    e.preventDefault();

    // Get Values
    var name = getInputVal('name');
    var email = getInputVal('email');
    var phone = getInputVal('phone');
    var upload = getInputVal('upload');
    var comments = getInputVal('comments');

    console.log("name: "+name);
    console.log("email: "+email);
    console.log("phone: "+phone);
    console.log("upload: "+upload);
    console.log("comments: "+comments);

    console.log(getInputVal('phone'));


    saveQuotation(name, email, phone, upload, comments);
}

// Function to get form values
function getInputVal(id) {
    return document.getElementById(id).value;
}

// save Quotation
function saveQuotation(name, email, phone, upload, comments){
    var newQuotationRef = quotationRef.push();
    console.log(newQuotationRef);
    newQuotationRef.set({
        name: name,
        email: email,
        phone: phone,
        upload: upload,
        comments: comments
    });
}