import { ADD_REMINDER } from '../constants';

const reminders = (state = [], action) => {
  let reminders = null;
  switch(action.type) {
    case ADD_REMINDER:
    reminders = [...state, reminder(action)]
  }
}