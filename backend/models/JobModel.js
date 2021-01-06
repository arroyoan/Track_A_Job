import mongoose from 'mongoose'

const JobSchema = new mongoose.Schema({
  jobTitle: {
    type: String,
    required: [true, 'Please add a job title']
  },
  jobDescription: {
    type: String,
    required: [true, 'Please add a brief description for the position'],
    maxlength: [250, 'Job Description must be at most 250 characters']
  },
  companyJobId: {
    type: String,
    required: [true, 'Please add a Company Job Id']
  },
  companyName: {
    type: String,
    required: [true, 'Please add a company name']
  },
  jobUrl: {
    type: String,
    match: [
      /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/,
      'Please add a valid URL with HTTP or HTTPS'
    ],
    required: true
  },
  jobCity: {
    type: String,
    required: true
  },
  jobState: {
    type: String,
    required: true
  },
  jobCountry: {
    type: String,
    required: true
  },
  isImportant: {
    type: Boolean,
    default: false
  },
  hasApplied: {
    type: Boolean,
    default: false
  },
  heardBack: {
    type: Boolean,
    default: false
  },
  haveInterviewed: {
    type: Boolean,
    default: false
  },
  haveOffer: {
    type: Boolean,
    default: false
  },
  notes: {
    type: String
  },
  user: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: true
  }
}, { timestamps: true })

// Static and Instance Methods

const Job = mongoose.model('Job', JobSchema)

export default Job