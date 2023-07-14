const addAffiliateSupplierCodeField = async (orderForm) => {
  const affiliateCodeFieldWrapper = document.createElement('div')
  affiliateCodeFieldWrapper.id = 'affiliateCodeFieldWrapper'

  const addCodeButton = document.createElement('button')
  addCodeButton.innerText = 'Adicionar código de afiliado'

  affiliateCodeFieldWrapper.appendChild(addCodeButton)

  const cartTotalizers = document.querySelector('.cart-totalizers')

  cartTotalizers.insertBefore(
    affiliateCodeFieldWrapper,
    cartTotalizers.childNodes[2]
  )

  const addInputField = () => {
    const codeField = document.createElement('input')
    codeField.placeholder = 'Código do afiliado'

    const addButton = document.createElement('button')
    addButton.innerText = 'Adicionar'

    const codeText = document.createElement('span')

    const removeButton = document.createElement('button')
    removeButton.innerText = 'Remover'
    removeButton.style.display = 'none'

    affiliateCodeFieldWrapper.appendChild(codeField)
    affiliateCodeFieldWrapper.appendChild(addButton)
    affiliateCodeFieldWrapper.appendChild(codeText)
    affiliateCodeFieldWrapper.appendChild(removeButton)

    addCodeButton.style.display = 'none'
    codeField.style.display = 'block'
    addButton.style.display = 'block'

    const updateDisplay = () => {
      if (codeField.style.display === 'none') {
        codeField.style.display = 'block'
        addButton.style.display = 'block'
        codeText.style.display = 'none'
        removeButton.style.display = 'none'
      } else {
        codeField.style.display = 'none'
        addButton.style.display = 'none'
        codeText.style.display = 'block'
        removeButton.style.display = 'block'
        codeText.innerText = codeField.value
      }
    }

    addButton.addEventListener('click', () => {
      updateDisplay()
      const codeField = document.querySelector(
        '#affiliateCodeFieldWrapper input'
      )
      if (codeField && codeField.value) {
        return vtexjs.checkout.setCustomData({
          app: 'affiliate-program',
          field: 'affiliateCode',
          value: codeField.value,
        })
      }
      removeButton.style.display = 'block'
    })

    removeButton.addEventListener('click', () => {
      affiliateCodeFieldWrapper.removeChild(codeField)
      affiliateCodeFieldWrapper.removeChild(addButton)
      affiliateCodeFieldWrapper.removeChild(codeText)
      affiliateCodeFieldWrapper.removeChild(removeButton)
      fetch(
        `/api/checkout/pub/orderForm/${orderForm.orderFormId}/customData/affiliate-program/affiliateCode`,
        {
          headers: {},
          method: 'DELETE',
        }
      )
      addCodeButton.style.display = 'block'
    })
  }

  const addInputFieldWithCodeFromOrderForm = async (orderForm) => {
    const codeField = document.createElement('input')
    codeField.placeholder = 'Código do afiliado'

    const addButton = document.createElement('button')
    addButton.innerText = 'Adicionar'

    const codeText = document.createElement('span')

    const removeButton = document.createElement('button')
    removeButton.innerText = 'Remover'
    removeButton.style.display = 'none'

    affiliateCodeFieldWrapper.appendChild(codeField)
    affiliateCodeFieldWrapper.appendChild(addButton)
    affiliateCodeFieldWrapper.appendChild(codeText)
    affiliateCodeFieldWrapper.appendChild(removeButton)

    addCodeButton.style.display = 'none'
    codeField.style.display = 'block'
    addButton.style.display = 'block'

    codeField.style.display = 'none'
    addButton.style.display = 'none'
    codeText.style.display = 'block'
    removeButton.style.display = 'block'
    codeText.innerText = orderForm.marketingData.utmSource

    await vtexjs.checkout.setCustomData({
      app: 'affiliate-program',
      field: 'affiliateCode',
      value: orderForm.marketingData.utmSource,
    })

    removeButton.addEventListener('click', () => {
      affiliateCodeFieldWrapper.removeChild(codeField)
      affiliateCodeFieldWrapper.removeChild(addButton)
      affiliateCodeFieldWrapper.removeChild(codeText)
      affiliateCodeFieldWrapper.removeChild(removeButton)
      fetch(
        `/api/checkout/pub/orderForm/${orderForm.orderFormId}/customData/affiliate-program/affiliateCode`,
        {
          headers: {},
          method: 'DELETE',
        }
      )
      addCodeButton.style.display = 'block'
    })
  }

  addCodeButton.addEventListener('click', addInputField)
  if (orderForm.marketingData?.utmSource) {
    addInputFieldWithCodeFromOrderForm(orderForm)
  }
}

let intervalId = setInterval(async function () {
  if (typeof vtexjs !== 'undefined') {
    clearInterval(intervalId)
    const orderForm = await vtexjs.checkout.getOrderForm()
    addAffiliateSupplierCodeField(orderForm)
  }
}, 100)
