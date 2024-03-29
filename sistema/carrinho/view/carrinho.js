const getCarrinho = () =>JSON.parse(localStorage.getItem('@sonhosGelados:carrinho')) || []
const setCarrinho = dadosCarrinho => localStorage.setItem('@sonhosGelados:carrinho', JSON.stringify(dadosCarrinho))

const real = Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' })
const tabela = document.querySelector("#tabela")
const buttonCarrinho = document.querySelector(".buttonCarrinho")

const mostrarCarrinho = () => {

    const carrinho = getCarrinho()

    let mostrarNaPagina = `
        <tr>
            <th>Nome</th>
            <th>Quantidade</th>
            <th>Preço</th>
            <th>Deletar</th>
        </tr>
    `

    if (carrinho.length > 0) {
        let soma = 0

        carrinho.forEach(item => {
            mostrarNaPagina += `
                <tr class="trProdutos">
                    <td>${item.nome}</td>
                    <td>
                        <button onclick="diminuirQtd(${item.id})" class="${item.qtd === 1 ? 'disabled' : ''}">-</button>
                        ${item.qtd}
                        <button onclick="aumentarQtd(${item.id})">+</button></td>
                    <td>${real.format(item.preco * item.qtd)} 
                        <small>
                            (${item.qtd}x ${real.format(item.preco)})
                        </small>
                    </td>
                    <td>
                        <button class="material-symbols-outlined" onclick=" remCarrinho(${item.id})">
                            delete
                        </button>
                    </td>
                </tr>  
            `
            soma += item.qtd * item.preco

        })

        tabela.innerHTML = mostrarNaPagina

        const trTotal = document.createElement("tr")

        trTotal.innerHTML = 
            `<td class="total" colspan="4" style="font-weight: bold;">Valor total: ${real.format(soma)}</td>`
        tabela.appendChild(trTotal)

    } else{
        mostrarNaPagina += `
            <tr>
                <td class="carrinhoVazio" colspan="4">Carrinho Vazio!</td>
            </tr>`
        
        tabela.innerHTML = mostrarNaPagina
    }

}

mostrarCarrinho()
