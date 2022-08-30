let productNameInput=document.getElementById("productNameInput");
let productPriceInput=document.getElementById("productPriceInput");
let productCategoryInput=document.getElementById("productCategoryInput");
let productDescriptionInput=document.getElementById("productDescriptionInput");
let tableBody =document.getElementById("tableBody");
let productContainer=[] ;
let productId ;
let addBtn=document.getElementById("addBtn");
let editBtn=document.getElementById("editBtn");
let updtedbtn=document.getElementById("updtedbtn")
let input=document.getElementById("input")

function getData(){
    fetch('http://localhost:3000/getAllProducts')
    .then(response => response.json())
    .then(json => {
       productContainer=json.results;
       displayProduct(productContainer)
       console.log(productContainer)
  })
}
getData();
function displayProduct(list)
{
    var productlist = ``; 
    for(var i = 0; i < list.length ; i++)
    {
        productlist += `<tr>
        <td>${i}</td>
        <td>${list[i].name}</td>
        <td>${list[i].price}</td>
        <td>${list[i].description}</td>
        <td><i onclick="setFormForUpdete(${i}) " id='updtedbtn' class="btn  fas fa-edit btnedit alert-dismissible  text-success"> </i></td>
        <td><i onclick="deleteProducts(${list[i].id})"  class="  btn  fas fa-trash-alt btndelete text-danger "> </i> </td>
    
    </tr>`;     
    }
    tableBody.innerHTML=productlist;
};


function crudProducts(endpoint,method,data){

// POST request using fetch()
fetch(`http://localhost:3000/${endpoint}`, {
	
	// Adding method type
	method: method,
	
	// Adding body or contents to send
	body: JSON.stringify(data),
	
	// Adding headers to the request
	headers: {
		"Content-type": "application/json; charset=UTF-8"
	}
})

// Converting to JSON
.then(response => response.json())

// Displaying results to console
.then(json => {
    if(json.message=='success'){
                    getData()
                }
});


}



function AddProduct()
{
    let  nameAlert=document.querySelector('.nameAlert');
    let  priceAlert=document.querySelector('.priceAlert');
    let  descAlert=document.querySelector('.descAlert');
    if(validateProductName() && validateProductPrice() &&validateProductDesc())
    {
        let product={
            name:productNameInput.value,
            price:productPriceInput.value,
            description:productDescriptionInput.value
        };

        crudProducts('addProducts','POST',product);
            clearForm();
            nameAlert.classList.replace("d-block","d-none");
            priceAlert.classList.replace("d-block","d-none");
            descAlert.classList.replace("d-block","d-none");
            productPrice.classList.remove("is-valid");
            productName.classList.remove("is-valid");
            productDescription.classList.remove("is-valid");
    }
    else if(validateProductName()==false)
    {

        nameAlert.classList.replace("d-none","d-block");
    }
    else if(validateProductPrice()==false)
    {

        priceAlert.classList.replace("d-none","d-block");
    }
    else{
        descAlert.classList.replace("d-none","d-block");
    }
    

};

function deleteProducts(indexProduct)
{
    let product={
        id:indexProduct
    }
    crudProducts('deleteProducts','DELETE',product)
}

function setFormForUpdete(updetedIndex)
{
    productNameInput.value =productContainer[updetedIndex].name ,
    productPriceInput.value = productContainer[updetedIndex].price ,
    productDescriptionInput.value = productContainer[updetedIndex].description,
   productId=productContainer[updetedIndex].id;

    addBtn.classList.add("d-none")
    editBtn.classList.replace("d-none","d-inline-block");

};

function update(){
    let product={
       id:productId ,
       name:productNameInput.value,
       price:productPriceInput.value,
       description:productDescriptionInput.value
    }
    crudProducts('updateProducts','PUT',product);
    clearForm()
    editBtn.classList.add("d-none")
    addBtn.classList.replace("d-none","d-inline-block");
    productPrice.classList.remove("is-valid");
    productName.classList.remove("is-valid");
    productDescription.classList.remove("is-valid");
}

function clearForm()
{
    productNameInput.value = "" ,
    productPriceInput.value = "" ,
    productDescriptionInput.value = ""
    productPrice.classList.remove("is-valid");
    productName.classList.remove("is-valid");
    productDescription.classList.remove("is-valid");
};





function searchProduct(searchTerm)
{
    var searchResult=[];
    for(var i=0 ; i< productContainer.length ; i++)
    {
        if(productContainer[i].name.toLowerCase().includes(searchTerm.toLowerCase()) == true)
        {
            searchResult.push(productContainer[i])
           
        }
        }
        displayProduct(searchResult);
        console.log(searchResult);
	
    //     fetch(`http://localhost:3000//SearchUsers/:'${searchTerm}'`)
    //     .then(response => response.json())
    //     .then(json => {
    //        productContainer=json.results;
    //        displayProduct(productContainer)
    //        console.log(productContainer)
    //   })
    
   
    
}

let productName=document.querySelector(".productName");
let productPrice=document.querySelector(".productPrice");
let productDescription=document.querySelector(".productDescription");

function validateProductName()
{
 var regexName=/^[A-Z]?[a-z]{3,8}[0-9]?/;
 
 if(regexName.test(productNameInput.value) == true)
 {
    productName.classList.replace("is-invalid","is-valid")
     return true;
 }   
 else
 {
    productName.classList.add("is-invalid")
     return false;
 }
}

function validateProductPrice()
{
 
 var regexPrice=/^[0-9]{3,10}/;
 
 if(regexPrice.test(productPriceInput.value) == true )
 {
    productPrice.classList.replace("is-invalid","is-valid")
     return true;
 }   
 else
 {
    
    productPrice.classList.add("is-invalid")
     return false;
 }
}

function validateProductDesc()
{
 
 var regexDesc=/[A-Z]?[a-z]{2,200}/gm;
 if(regexDesc.test(productDescriptionInput.value) == true)
 {
    productDescription.classList.replace("is-invalid","is-valid")
     return true;
 }   
 else
 {
    productDescription.classList.add("is-invalid");
     return false;
 }
}





