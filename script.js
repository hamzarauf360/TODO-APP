const classNames = {
  TODO_ITEM: 'todo-container',
  TODO_CHECKBOX: 'todo-checkbox',
  TODO_TEXT: 'todo-text',
  TODO_DELETE: 'todo-delete',
}

const list = document.getElementById('todo-list')
const itemCountSpan = document.getElementById('item-count')
const uncheckedCountSpan = document.getElementById('unchecked-count')

const flag = { // to maintain the counter correctly for items count  and unchecked items
  val: true
}

function newTodo() {


  count.inc(flag) // incrementing the unchecked and items count

  const listItem = document.createElement('LI') // creating a todo list items

  const listTextNode = document.createTextNode(count.get_count() + '.Item') // creating a text to display inside our list at each index

  listItem.appendChild(listTextNode) //inserting the text inside the list item

  const allItems = list.appendChild(listItem) // inserting our list element in our unordered list tag

  listItem.id = count.get_count() // assigning id to each list item

  allItems.style.textAlign = "center" // to move the list element in center of page
  allItems.style.fontSize = "xx-large" // to set font size
  document.getElementById(listItem.id).style.color = "green"



  listItem.onmouseover = function() { // when we hover on one list item we change its color
    document.getElementById(listItem.id).style.color = "red"
  }
  listItem.onmouseout = function() { // when we hover out of one list item we change its color back to black
    document.getElementById(listItem.id).style.color = "green"
  }

  listItem.onclick = function() { // when an item of the list is clicked we cross it off and decrement the count of unchecked items
    if (document.getElementById(listItem.id).style.textDecoration != 'line-through') { // so that same item can't be crossed twice
      document.getElementById(listItem.id).style.textDecoration = "line-through"
      count.dec(flag)
      uncheckedCountSpan.innerHTML = count.get_dec_count() // to update unchcked count on html
      flag.val = false // we set it false so that we can correctly increment the respective counters
      if (count.get_dec_count() === 0) { // when all items gets crossed
        itemCountSpan.innerHTML = 0 // set item count to 0
        alert("List is Empty Now :) ") // we alert the user
        list.innerHTML = ""
        count.set_items_count() // set the value again to 0 for total items
      }
    }
  }

  itemCountSpan.innerHTML = count.get_count() // to update item count on html

  uncheckedCountSpan.innerHTML = count.get_dec_count() // to update unchcked count on html

}



const count = (function() { // The iife which we will use to increment or decrement our items count and uncheckd_items_count when New TODO is clicked or an item is crossed off the list

  let items_count = 0
  let uncheckd_items_count = 0

  return { // closure used to increment or decrement count and to get the value

    inc: function(flag) {
      items_count = items_count + 1
      if (flag.val) { // when flag's value is true we set unchecd items count  = count

        uncheckd_items_count = items_count
      } else { // when flag is false we increment the dec count
        {
          uncheckd_items_count = uncheckd_items_count + 1
        }
      }
    },
    dec: function(flag) { // this decrements the value of uncheckd_items_count to cross them off our list
      uncheckd_items_count = uncheckd_items_count - 1


    },

    set_items_count: function() { // to set the items count to 0 when list gets unchecked
      items_count = 0
    },
    get_count: function() { // getter for items count
      return items_count
    },
    get_dec_count: function() { //getter for uncheckd_items_count
      return uncheckd_items_count
    },
  }

})()