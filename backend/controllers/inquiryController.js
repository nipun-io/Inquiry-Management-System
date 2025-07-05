import Inquiry from "../models/Inquiry.js";

export const submitInquiry = async (req, res) => {
  try {
    const {
      name,
      groupType,
      contactNo,
      college,
      gender,
      course,
      courseYear,
      enquiryFor,
      enquiryDetail,
      designation,
      reason,
      groupMembers,
    } = req.body;

    if (
      !name ||
      !groupType ||
      !contactNo ||
      !college ||
      !gender ||
      !course ||
      !courseYear ||
      !enquiryFor ||
      (
        (enquiryFor !== "College Enquiry" && !enquiryDetail) ||
        (enquiryFor === "College Enquiry" && (!designation || !reason))
      )
    ) {
      return res.status(400).json({ message: "All fields are required." });
    }

    const inquiry = new Inquiry({
      name,
      groupType,
      contactNo,
      college,
      gender,
      course,
      courseYear,
      enquiryFor,
      enquiryDetail,
      designation: enquiryFor === "College Enquiry" ? designation : undefined,
      reason: enquiryFor === "College Enquiry" ? reason : undefined,
      groupMembers: groupType === "Group" ? groupMembers : undefined,
    });
    await inquiry.save();
    res.status(201).json({ message: "Inquiry submitted successfully." });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
