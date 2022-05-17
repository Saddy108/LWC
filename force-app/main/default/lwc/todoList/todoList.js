import { LightningElement, api } from 'lwc';

export default class TodoList extends LightningElement {
    // Spring 20 Note on tracked properties: this component may seem to
    // mutate an array, but because Array.prototype.filter() always creates
    // a new array, in fact no mutation occurs. Since we always assign
    // a new array to filteredTodos, the track decorator is not required.
    filteredTodos = [];

    _todos = [];

    priorityFilter = false;

    @api
    get todos() {
        return this._todos;
    }

    // SGN : We can use this set method to set value and also run function or filter or logic to run.
    set todos(value) {
        this._todos = value;
        this.filterTodos();
    }

    // SGN : If checkbox is clicked in this child component, then if condition will be executed. Otherwise whatever values come
    // from parent it will execute that.
    filterTodos() {
        if (this.priorityFilter) {
            // SGN : Filter method of Array is used to check which data has filter enabled, so it shows that only
            this.filteredTodos = this._todos.filter(
                (todo) => todo.priority === true
            );
        } else {
            this.filteredTodos = this._todos;
        }
    }

    handleCheckboxChange(event) {
        this.priorityFilter = event.target.checked;
        this.filterTodos();
    }
}
