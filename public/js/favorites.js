const token = localStorage.getItem('token');
if(!token){alert('Giriş yapın'); location.href='login.html';}
async function loadFavorites() {
  const res = await fetch('/api/favorites',{headers:{Authorization:'Bearer '+token}});
  const favs = await res.json();
  const container = document.getElementById('favorites-list'); container.innerHTML='';
  favs.forEach(p=>{
    const card=document.createElement('div'); card.className='product-card';
    card.innerHTML=`
      <img src="${p.imageUrl}" class="product-image">
      <div class="p-4">
        <h3>${p.name}</h3>
        <p>${p.price} ₺</p>
        <a href="product.html?id=${p._id}" class="btn-primary bg-blue-600 text-white hover:bg-blue-700">Detay</a>
      </div>
    `;
    container.appendChild(card);
  });
}
document.addEventListener('DOMContentLoaded',loadFavorites);
function loadFavorites() {
  const token = localStorage.getItem('token');
  if (!token) return window.location.href = '/login.html';
  fetch('/api/favorites', {
    headers: { 'Authorization': 'Bearer ' + token }
  })
  .then(res => res.json())
  .then(data => {
    const container = document.getElementById('favorites-items');
    if (!container) return;
    container.innerHTML = '';
    data.items.forEach(item => {
      const div = document.createElement('div');
      div.className = 'product-card';
      div.innerHTML = `<img src="${item.product.imageUrl}" alt="${item.product.name}" class="product-image"><span>${item.product.name}</span>`;
      container.appendChild(div);
    });
  });
}
document.addEventListener('DOMContentLoaded', loadFavorites);
