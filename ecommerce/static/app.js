// Configure suas chaves do Supabase aqui
const supabaseUrl = 'COLOQUE_URL_DO_SUPABASE';
const supabaseKey = 'COLOQUE_CHAVE_ANON';
const supabase = supabase.createClient(supabaseUrl, supabaseKey);

const authSection = document.getElementById('auth');
const productsSection = document.getElementById('products');
const productList = document.getElementById('product-list');

// ---- Autenticação ----
async function signUp(email, password) {
    const { error } = await supabase.auth.signUp({ email, password });
    if (error) return alert(error.message);
    alert('Registro realizado. Verifique seu email.');
}

async function signIn(email, password) {
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) return alert(error.message);
    authSection.classList.add('hidden');
    productsSection.classList.remove('hidden');
    fetchProducts();
}

async function signOut() {
    await supabase.auth.signOut();
    authSection.classList.remove('hidden');
    productsSection.classList.add('hidden');
}

document.getElementById('register-form').addEventListener('submit', e => {
    e.preventDefault();
    signUp(
        document.getElementById('register-email').value,
        document.getElementById('register-password').value
    );
});

document.getElementById('login-form').addEventListener('submit', e => {
    e.preventDefault();
    signIn(
        document.getElementById('login-email').value,
        document.getElementById('login-password').value
    );
});

document.getElementById('logout').addEventListener('click', signOut);

// ---- CRUD de Produtos ----
async function fetchProducts() {
    productList.innerHTML = '';
    const { data, error } = await supabase.from('products').select('*');
    if (error) return console.error(error);
    data.forEach(prod => addProductToList(prod));
}

function addProductToList(prod) {
    const li = document.createElement('li');
    li.textContent = `${prod.name} - R$${prod.price}`;

    const del = document.createElement('button');
    del.textContent = 'Excluir';
    del.onclick = () => deleteProduct(prod.id);

    li.appendChild(del);
    productList.appendChild(li);
}

async function createProduct(name, price) {
    const { error } = await supabase.from('products').insert({ name, price });
    if (error) return alert(error.message);
    fetchProducts();
}

async function deleteProduct(id) {
    const { error } = await supabase.from('products').delete().eq('id', id);
    if (error) return alert(error.message);
    fetchProducts();
}

document.getElementById('product-form').addEventListener('submit', e => {
    e.preventDefault();
    createProduct(
        document.getElementById('product-name').value,
        parseFloat(document.getElementById('product-price').value)
    );
    e.target.reset();
});

// Verifica se existe usuário logado ao carregar
supabase.auth.getUser().then(({ data }) => {
    if (data.user) {
        authSection.classList.add('hidden');
        productsSection.classList.remove('hidden');
        fetchProducts();
    }
});
