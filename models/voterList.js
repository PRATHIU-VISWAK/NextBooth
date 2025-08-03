import mongoose from 'mongoose';

const voterSchema = new mongoose.Schema({
  Booth: Number,
  SN: Number,
  PN: Number,
  VoterID: String,
  Name: String,
  NameENG: String,
  Father_Husband: String,
  Father_HusbandENG: String,
  House_Number: String,
  sex: String,
  Age: Number,
  Phone: String,
  Govt_Phone: String,
});

// Prevent model redefinition in development with hot reload
export default mongoose.models.VoterList || mongoose.model('VoterList', voterSchema); 
