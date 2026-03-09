/* ================= FEEDBACK + RATING TABLE ================= */

export const userRating = {

  keys: [
    'studentid',
    'courseid',
    'message',
    'rating',
    'submitted_at'
  ],

  config: {

    studentid: {
      label: 'Student ID',
      type: 'string',
      class: 'commonDesc'
    },

    courseid: {
      label: 'Course ID',
      type: 'string',
      class: 'commonDesc'
    },

    message: {
      label: 'Feedback Message',
      type: 'string',
      class: 'commonDesc'
    },

    rating: {
      label: 'Rating ⭐',
      type: 'number',
      class: 'commonDesc'
    },

    submitted_at: {
      label: 'Date',
      type: 'date',
      class: 'commonDesc'
    }

  }

};