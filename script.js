const foodData = {
  Soup: {
    Asian: {
      Spicy: { name: 'Tagturitan', image : 'https://www.cookerru.com/wp-content/uploads/2021/11/dakdoritang-recipe-feature.jpg'},
      Mongolian: {name: 'Bayangoliin Huitsaa', image:'https://www.ub.life/uploads/images/ub%20huitsaa%203.jpg'},
      CustomMade: {name: 'Hot Pot', image: 'https://www.aheadofthyme.com/wp-content/uploads/2021/01/chinese-hot-pot-at-home.jpg'},
      Mild: {name :'Ramen', image: 'https://thecozycook.com/wp-content/uploads/2023/02/Homemade-Ramen-f-500x500.jpg'}
    },

    European: {
    European: {name:'some kind of fancy chowder', image:'https://www.wellplated.com/wp-content/uploads/2023/05/Potato-Corn-Chowder.jpg'}
    },
  },

  Dish: {
    IhMahtai: {
      Mongol: {name :'Mahni tsugluulga or Shorlog', image: 'https://media.istockphoto.com/id/1329496904/photo/grilled-assorted-meat-platter-with-potato-wedges-and-sauces.jpg?s=612x612&w=0&k=20&c=NgyWtoc5fMBUZwTX4rFNag29hY4X7SosxZBlExPq46o='},
      Korean: {name: 'Samgyobsal or BBQ Chicken', image: 'https://assets-metrostyle.abs-cbn.com/prod/metrostyle/attachments/fa017f0c-cdb2-4e90-85ac-95e37da63932_samgyupsabahay.jpg'}
    },

    Regular: {
      Spicy:{name: 'Dogbuggi', image:'https://asianinspirations.com.au/wp-content/uploads/2021/09/R00397-Hot-Spicy-Tteokbokki.jpg'},
      Mild:{name: 'Japenese dishes',image:'https://cdn.vox-cdn.com/thumbor/WMgrx0k599sQDZEByhL67j1Iubk=/0x0:4080x3072/1200x0/filters:focal(0x0:4080x3072):no_upscale()/cdn.vox-cdn.com/uploads/chorus_asset/file/24739427/PXL_20230616_195632037.PORTRAIT.ORIGINAL.jpg'}
    },

    Fun:{
      Spicy:{name: 'Mexican',image:'https://recipes.net/wp-content/uploads/2022/06/taco-vs-burrito.jpg'},
      New:{name: 'Sushi',image:'https://cdn.tasteatlas.com/Images/Dishes/fde953e5aa504e8c83a84691582b0399.jpg?m=facebook'},
      Italian:{ name:'Pizza',image:'https://www.onceuponachef.com/images/2020/06/Margherita-Pizza-scaled.jpg'},
      American:{ name:'Burger',image:'https://www.recipetineats.com/wp-content/uploads/2022/08/Stack-of-cheeseburgers.jpg'},
      ihPortstoi:{ name:'Chinese',image:'https://media.istockphoto.com/id/545286388/photo/chinese-food-blank-background.jpg?s=612x612&w=0&k=20&c=pqOIy07YKO5PlU5VxjscwTGRrrZ8PluKMUjSOz-II60='}
    },

    Fancy:{
      Italian:{name: 'Pasta',image:'https://www.aheadofthyme.com/wp-content/uploads/2021/01/spaghetti-carbonara.jpg'},
      MEATT:{name: 'Steak',image:'https://diethood.com/wp-content/uploads/2021/02/ribeye-steak-5.jpg'},
      ZugerFancyGazarOryo:{ name:'OK',image:'https://th-thumbnailer.cdn-si-edu.com/0CmJdh7Znln4RP-YPlCkOuzdZDo=/fit-in/1600x0/https://tf-cmsv2-smithsonianmag-media.s3.amazonaws.com/filer/42/f6/42f66ba8-7e26-4705-9045-69f9246bea07/ok.jpg'}
    },

    FastFood:{
      Chicken:{ name:'KFC',image:'https://i.kym-cdn.com/photos/images/original/001/859/629/12b.jpg'},
      Burger:{ name:'Burger King',image:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRWDhMZNk1MHNYptrEwG5_OslpwPAkjKOTcng&usqp=CAU'},
      Pizza:{ name:'Pizza hut',image:'https://media.tenor.com/images/b20478cc147769ca41b8d793b9ace57e/tenor.png'}
    },
  },
};
let currentStep = 1;
let selectedChoices = [];

function renderChoices() {
  const choicesDiv = document.getElementById('choices');
  choicesDiv.innerHTML = '';

  if (currentStep === 1) {
    const choices = ['Soup', 'Dish'];
    choices.forEach(choice => {
      const choiceButton = document.createElement('button');
      choiceButton.textContent = choice;
      choiceButton.onclick = () => selectChoice(choice);
      choicesDiv.appendChild(choiceButton);
    });
  } else if (currentStep === 2) {
    const foodType = selectedChoices[0];
    const choices = Object.keys(foodData[foodType]);
    choices.forEach(choice => {
      const choiceButton = document.createElement('button');
      choiceButton.textContent = choice;
      choiceButton.onclick = () => selectChoice(choice);
      choicesDiv.appendChild(choiceButton);
    });
  } else if (currentStep === 3) {
    const [foodType, cuisine] = selectedChoices;
    const choices = Object.keys(foodData[foodType][cuisine]);
    choices.forEach(choice => {
      const choiceButton = document.createElement('button');
      choiceButton.textContent = choice;
      choiceButton.onclick = () => selectChoice(choice);
      choicesDiv.appendChild(choiceButton);
    });
  }
}

function selectChoice(choice) {
  selectedChoices[currentStep - 1] = choice;
  if (currentStep < 3) {
    currentStep++;
    renderChoices();
  } else {
    showRecommendation();
  }
}

function showRecommendation() {
  const [foodType, spiciness, cuisine] = selectedChoices;
  const recommendation = foodData[foodType]?.[spiciness]?.[cuisine];

  const recommendationDiv = document.getElementById('recommendation');
  if (recommendation) {
    const { name, image } = recommendation;
    recommendationDiv.innerHTML = `
      <p>${name}! 😎👉👉</p>
      <div class="image-container">
        <img src="${image}" alt="${name} Image">
      </div>
    `;
  } else {
    recommendationDiv.textContent = "Puee tiim hool bdga?";
  }
}



function nextStep() {
  if (currentStep < 3) {
    currentStep++;
    renderChoices();
  } else {
    showRecommendation();
  }
}

renderChoices();
