package com.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name="students")
public class Student {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	
	@Column(name = "full_name", nullable = false)
	private String fullName;
	
	@Column(name = "mobile", nullable = false)
	private String mobile;
	
	@Column(name = "email", nullable = false)
	private String email;
	
	@Column(name = "education", nullable = false)
	private String education;
	
	@Column(name = "gender", nullable = false)
    private String gender;
	
	@Column(name = "blood_grp", nullable = false)
	private String bloodGrp;
	
	@Column(name = "college_name", nullable = false)
	private String collegeName;
	
	@Column(name = "address", nullable = false)
	private String address;
	
	
	// Getters and Setters
	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getFullName() {
		return fullName;
	}

	public void setFullName(String fullName) {
		this.fullName = fullName;
	}

	public String getMobile() {
		return mobile;
	}

	public void setMobile(String mobile) {
		this.mobile = mobile;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getEducation() {
		return education;
	}

	public void setEducation(String education) {
		this.education = education;
	}

	public String getGender() {
		return gender;
	}

	public void setGender(String gender) {
		this.gender = gender;
	}

	public String getBloodGrp() {
		return bloodGrp;
	}

	public void setBloodGrp(String bloodGrp) {
		this.bloodGrp = bloodGrp;
	}

	public String getCollegeName() {
		return collegeName;
	}

	public void setCollegeName(String collegeName) {
		this.collegeName = collegeName;
	}

	public String getAddress() {
		return address;
	}

	public void setAddress(String address) {
		this.address = address;
	}


	@Override
	public String toString() {
		return "Student [id=" + id + ", fullName=" + fullName + ", mobile=" + mobile + ", email=" + email
				+ ", education=" + education + ", gender=" + gender + ", bloodGrp=" + bloodGrp + ", collegeName="
				+ collegeName + ", address=" + address + "]";
	}
	
	

}
