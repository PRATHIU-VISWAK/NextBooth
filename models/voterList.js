import mongoose from 'mongoose';

const voterSchema = new mongoose.Schema({
  Booth: Number,
  SN: Number,
  PN: Number,
  VoterID: String,
  Name: String,
  Father_Husband: String,
  sex: String,
  Age: Number,
});

// Prevent model redefinition in development with hot reload
export default mongoose.models.VoterList || mongoose.model('VoterList', voterSchema); 