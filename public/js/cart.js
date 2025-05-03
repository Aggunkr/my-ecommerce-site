const token = localStorage.getItem('token');
if(!token){alert('Giriş yapın'); location.href='login.html';}
async function loadCart() {
  const res = await fetch('/api/cart',{headers:{Authorization:'Bearer '+token}});
  const {items} = await res.json();
  const container = document.getElementById('cart-items'); container.innerHTML='';
  let total = 0;
  items.forEach(it=>{
    total+=it.quantity*it.product.price;
    const d=document.createElement('div'); d.className='flex items-center bg-white p-4 rounded-lg shadow';
    d.innerHTML=`
      <img src="${it.product.imageUrl}" class="w-20 h-20 object-cover rounded mr-4">
      <div class="flex-1">
        <h4 class="font-semibold">${it.product.name}</h4>
        <p>${it.quantity} × ${it.product.price} ₺</p>
      </div>
      <button data-id="${it.product._id}" class="remove-btn btn-primary bg-red-500 hover:bg-red-600">Sil</button>
    `;
    container.appendChild(d);
  });
  document.getElementById('cart-summary').textContent='Toplam: '+total.toFixed(2)+' ₺';
}
async function removeFromCart(id) {
  await fetch(`/api/cart/${id}`,{method:'DELETE',headers:{Authorization:'Bearer '+token}});
  loadCart();
}
document.addEventListener('DOMContentLoaded',()=>{
  loadCart();
  document.getElementById('cart-items').addEventListener('click',e=>{
    if(e.target.matches('.remove-btn')) removeFromCart(e.target.dataset.id);
  });
});
// Add to cart functionality
function addToCart(productId) {
  fetch('/api/cart', {
    method: 'POST',
    headers: {'Content-Type':'application/json'},
    body: JSON.stringify({productId})
  })
  .then(res => res.json())
  .then(data => alert('Ürün sepete eklendi!'))
  .catch(err => console.error(err));
}

function loadCart() {
  const token = localStorage.getItem('token');
  if (!token) return window.location.href = '/login.html';
  fetch('/api/cart', {
    headers: { 'Authorization': 'Bearer ' + token }
  })
  .then(res => res.json())
  .then(data => {
    const container = document.getElementById('cart-items');
    if (!container) return;
    container.innerHTML = '';
    data.items.forEach(item => {
      const div = document.createElement('div');
      div.className = 'cart-item';
      div.innerHTML = `<span>${item.product.name}</span><span>Adet: ${item.quantity}</span>`;
      container.appendChild(div);
    });
    document.getElementById('cart-count').textContent = data.items.length;
  });
}
document.addEventListener('DOMContentLoaded', loadCart);
