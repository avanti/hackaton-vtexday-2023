const addAffiliateSupplierCodeField = (ownersNames) => {
  const affiliateCodeFieldWrapper = document.createElement('div')
  affiliateCodeFieldWrapper.id = 'affiliateCodeFieldWrapper'

  const addCodeButton = document.createElement('button')
  addCodeButton.innerText = 'Adicionar código'

  affiliateCodeFieldWrapper.appendChild(addCodeButton)

  document
    .querySelector('.cart-totalizers')
    .appendChild(affiliateCodeFieldWrapper)

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
          app: 'affiliates-program',
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
      // we need this fetch because vtexjs does not have a method to remove customData
      fetch(
        `/api/checkout/pub/orderForm/228fae38fbcd430ca6954c15e4076931/customData/affiliates-program/affiliateCode`,
        {
          headers: {},
          method: 'DELETE',
        }
      )
      addCodeButton.style.display = 'block'
    })
  }

  addCodeButton.addEventListener('click', addInputField)
}

let intervalId = setInterval(function () {
  if (typeof vtexjs !== 'undefined') {
    clearInterval(intervalId)
    addAffiliateSupplierCodeField()
  }
}, 100)
