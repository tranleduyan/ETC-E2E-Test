const home = "/";

/**
 * Dev App Loaded and Running Test
 * Makes sure the dev app is up and running before the tests are run.
 */
describe('Web App Successfully Loaded', () => {
  it('Dev App Loaded Up', () => {
    cy.visit(home)
  })
})

/**
 * Sign In Page Tests
 * Tests if the first page that the user is shown is the sign-in page
 * Then if all the inputs and buttons and other UI stuff works as expected
 * Contains first success then error test cases
 * Success: sign in with user_test@spu.edu and test123
 * Fail: invalid email, password, and unknown email
 */
describe("Sign In Page", () => {
  beforeEach(() => {
    cy.visit(home);
  });

  it("This is the Sign In Page", () => {
    /** Verify if this is a Sign In page */
    cy.contains("Sign in to continue").should("exist");

    /** Verify "Continue" button */
    cy.contains("Continue").should("exist");

    /** Verify if "Can't Sign In" button exists */
    cy.contains("Can't Sign In?").should("exist");
  });

  it("Create an Account Works", () => {
    /** Verify if "Create an account" button exists */
    cy.contains("Create an account").should("exist").click();

    /** Verify if the user is navigated to Sign Up page */
    cy.url().should('include', '/SignUp');
  });

  it("Successful Sign In", () => {
    /** Verify if the input field for school email */
    cy.get("input[name='emailAddress'").should("exist").type("user_test@spu.edu");

    /** Verify if "Continue" button */
    cy.contains("Continue").should("exist").click();
  
    /** Verify if the input field for password */
    cy.get("input[name='password'").should("exist").type("test123");
  
    /** Verify if "Sign In" button exists */
    cy.contains("Sign In").should("exist").click();

    /** Verify if user is navigated to Dashboard */
		cy.url().should("include", "/Dashboard");
  })

  it("Failed Sign In with Invalid Email", () => {
    /** ----------- Missing ----------- */
    /** Verify if "Continue" button */
    cy.contains("Continue").should("exist").click();

    /** Verify if no email error message appears */
    cy.contains("Please enter your school email address.").should("exist");

    /** Verify if user stays on the current page */
    cy.url().should("include", "/");

    /** ----------- Not SPU email ----------- */
    /** Verify if the input field for school email */
    cy.get("input[name='emailAddress'").should("exist").type("user_test@outlook.com");

    /** Verify if "Continue" button */
    cy.contains("Continue").should("exist").click();

    /** Verify if valid email address error message appears */
    cy.contains("Please enter a valid school email address.").should("exist");

    /** Verify if user stays on the current page */
    cy.url().should("include", "/");

    /** ----------- Invalid Format ----------- */
    /** Verify if the input field for school email */
    cy.get("input[name='emailAddress'").should("exist").type("user_test@.com");

    /** Verify if "Continue" button */
    cy.contains("Continue").should("exist").click();

    /** Verify if valid email address error message appears */
    cy.contains("Please enter a valid school email address.").should("exist");

    /** Verify if user stays on the current page */
    cy.url().should("include", "/");
  })

  it("Failed Sign In with Invalid Password", () => {
    /** Verify if the input field for school email */
    cy.get("input[name='emailAddress'").should("exist").type("user_test@spu.edu");

    /** Verify if "Continue" button */
    cy.contains("Continue").should("exist").click();

    /** ----------- Missing ----------- */
    /** Verify if "Sign In" button exists */
    cy.contains("Sign In").should("exist").click();

    /** Verify if no password error message appears */
    cy.contains("Please enter your password.").should("exist");

    /** Verify if user stays on the current page */
    cy.url().should("include", "/");

    /** ----------- Incorrect ----------- */
    /** Verify if the input field for password */
    cy.get("input[name='password'").should("exist").type("test321");

    /** Verify if "Sign In" button exists */
    cy.contains("Sign In").should("exist").click();

    /** Verify if invalid credentials error message appears */
    cy.contains("Invalid credentials.").should("exist");

    /** Verify if user stays on the current page */
    cy.url().should("include", "/");
  })

  it("Failed Sign In with Unknown Email", () => {
    /** Verify if the input field for school email */
    cy.get("input[name='emailAddress'").should("exist").type("who_is_this@spu.edu");

    /** Verify if "Continue" button */
    cy.contains("Continue").should("exist").click();

    /** Verify if the input field for password */
    cy.get("input[name='password'").should("exist").type("test123");

    /** Verify if "Sign In" button exists */
    cy.contains("Sign In").should("exist").click();

    /** Verify if invalid credentials error message appears */
    cy.contains("Invalid credentials.").should("exist");

    /** Verify if user stays on the current page */
    cy.url().should("include", "/");
  })
});

/**
 * Sign Up Page Tests
 * Tests successful navigation to Sign-Up page
 * Then if all the inputs and buttons and other UI stuff works as expected
 * Contains first success then error test cases
 * (Ignores middle name and email verification)
 * Success: sign up with temp@spu.edu, first, last, 900736428, and wakemeupwhenyougogo
 * Fail: invalid email, school ID, and password; missing names; and existing account (email and school ID)
 */
describe("Sign Up Page", () => {
  beforeEach(() => {
    cy.visit(home);
    cy.contains("Create an account").click();
  });

  it("This is the Sign Up Page", () => {
    /** Verify if this is a Sign Up page */
    cy.contains("Sign up to continue").should("exist");

    /** Verify "Continue" button */
    cy.contains("Continue").should("exist");

    /** Verify if "Already have an account? Sign In" button exists */
    cy.contains("Already have an account? Sign In").should("exist");
  })

  it("Sign In button Works", () => {
    /** Verify if "Create an account" button exists */
    cy.contains("Already have an account? Sign In").should("exist").click();

    /** Verify if the user is navigated to Sign In page */
    cy.url().should('include', home);
  });

  it("Successful Sign Up", () => {
    /** Verify and enter temp SPU email into school email input field */
    cy.get("input[name='emailAddress'").should("exist").type("temp@spu.edu");
    
    /** Verify if "Continue" button */
    cy.contains("Continue").should("exist").click();

    /** Verify and enter temp first name into first name input field */
    cy.get("input[name='firstName'").should("exist").type("first");

    /** Verify and enter temp last name into last name input field */
    cy.get("input[name='lastName'").should("exist").type("last");

    /** Verify if "Continue" button */
    cy.contains("Continue").should("exist").click();

    /** Verify and enter temp school ID into school ID input field */
    cy.get("input[name='schoolId'").should("exist").type("900736428");

    /** Verify if "Continue" button */
    cy.contains("Continue").should("exist").click();

    /** Verify and enter temp password into password input field */
    cy.get("input[name='password'").should("exist").type("wakemeupwhenyougogo");

    /** Verify and enter temp password into password confirm input field */
    cy.get("input[name='confirmPassword'").should("exist").type("wakemeupwhenyougogo");

    /** Verify if "Continue" button */
    cy.contains("Continue").should("exist").click();

    /** Verify if user navigates to Verification page */
    cy.url().should("include", "/Verification");
  })

  it("Failed Sign Up with Invalid Email", () => {
    /** ----------- Missing ----------- */
    /** Verify if "Continue" button */
    cy.contains("Continue").should("exist").click();

    /** Verify if no email error message appears */
    cy.contains("Please enter your school email address.").should("exist");

    /** Verify if user stays on the current page */
    cy.url().should("include", "/SignUp");

    /** ----------- Not SPU email ----------- */
    /** Verify if the input field for school email */
    cy.get("input[name='emailAddress'").should("exist").type("wii@outlook.com");

    /** Verify if "Continue" button */
    cy.contains("Continue").should("exist").click();

    /** Verify if valid email address error message appears */
    cy.contains("Please enter a valid school email address.").should("exist");

    /** Verify if user stays on the current page */
    cy.url().should("include", "/SignUp");

    /** ----------- Invalid Format ----------- */
    /** Verify if the input field for school email */
    cy.get("input[name='emailAddress'").should("exist").type("wii@.com");

    /** Verify if "Continue" button */
    cy.contains("Continue").should("exist").click();

    /** Verify if valid email address error message appears */
    cy.contains("Please enter a valid school email address.").should("exist");

    /** Verify if user stays on the current page */
    cy.url().should("include", "/SignUp");
  })

  it("Failed Sign Up with No First Name", () => {
    /** Verify and enter temp SPU email into school email input field */
    cy.get("input[name='emailAddress'").should("exist").type("temp@spu.edu");
    
    /** Verify if "Continue" button */
    cy.contains("Continue").should("exist").click();

    /** Verify and enter temp last name into last name input field */
    cy.get("input[name='lastName'").should("exist").type("last");

    /** Verify if "Continue" button */
    cy.contains("Continue").should("exist").click();

    /** Verify if first name error message appears */
    cy.contains("Please enter your first name.").should("exist");

    /** Verify if user stays on Sign Up page */
    cy.url().should("include", "/SignUp");
  })

  it("Failed Sign Up with No Last Name", () => {
    /** Verify and enter temp SPU email into school email input field */
    cy.get("input[name='emailAddress'").should("exist").type("temp@spu.edu");
    
    /** Verify if "Continue" button */
    cy.contains("Continue").should("exist").click();

    /** Verify and enter temp first name into first name input field */
    cy.get("input[name='firstName'").should("exist").type("first");

    /** Verify if "Continue" button */
    cy.contains("Continue").should("exist").click();

    /** Verify if last name error message appears */
    cy.contains("Please enter your last name.").should("exist");

    /** Verify if user stays on Sign Up page */
    cy.url().should("include", "/SignUp");
  })

  it("Failed Sign Up with Invalid School ID", () => {
    /** Verify and enter temp SPU email into school email input field */
    cy.get("input[name='emailAddress'").should("exist").type("temp@spu.edu");
    
    /** Verify if "Continue" button */
    cy.contains("Continue").should("exist").click();

    /** Verify and enter temp first name into first name input field */
    cy.get("input[name='firstName'").should("exist").type("first");

    /** Verify and enter temp last name into last name input field */
    cy.get("input[name='lastName'").should("exist").type("last");

    /** Verify if "Continue" button */
    cy.contains("Continue").should("exist").click();

    /** ----------- Missing ----------- */
    /** Verify if "Continue" button */
    cy.contains("Continue").should("exist").click();

    /** Verify if school ID error message appears */
    cy.contains("Please enter your school ID.").should("exist");

    /** Verify if user stays on Sign Up page */
    cy.url().should("include", "/SignUp");

    /** ----------- Not Numeric ----------- */
    /** Verify and enter temp school ID into school ID input field */
    cy.get("input[name='schoolId'").should("exist").type("---+++aaa000");

    /** Verify if "Continue" button */
    cy.contains("Continue").should("exist").click();

    /** Verify if school ID error message appears */
    cy.contains("Please enter a valid school ID.").should("exist");

    /** Verify if user stays on Sign Up page */
    cy.url().should("include", "/SignUp");

    /** ----------- Invalid Format ----------- */
    /** Verify and enter temp school ID into school ID input field */
    cy.get("input[name='schoolId'").should("exist").type("900111222333444");

    /** Verify if "Continue" button */
    cy.contains("Continue").should("exist").click();

    /** Verify if school ID error message appears */
    cy.contains("Please enter a valid school ID.").should("exist");

    /** Verify if user stays on Sign Up page */
    cy.url().should("include", "/SignUp");
  })

  it("Failed Sign Up with Invalid Password", () => {
    /** Verify and enter temp SPU email into school email input field */
    cy.get("input[name='emailAddress'").should("exist").type("temp@spu.edu");
    
    /** Verify if "Continue" button */
    cy.contains("Continue").should("exist").click();

    /** Verify and enter temp first name into first name input field */
    cy.get("input[name='firstName'").should("exist").type("first");

    /** Verify and enter temp last name into last name input field */
    cy.get("input[name='lastName'").should("exist").type("last");

    /** Verify if "Continue" button */
    cy.contains("Continue").should("exist").click();

    /** Verify and enter temp school ID into school ID input field */
    cy.get("input[name='schoolId'").should("exist").type("900736428");

    /** Verify if "Continue" button */
    cy.contains("Continue").should("exist").click();

    /** ----------- Missing ----------- */
    /** Verify if "Continue" button */
    cy.contains("Continue").should("exist").click();

    /** Verify if missing password error message appears */
    cy.contains("Please enter your password.").should("exist");

    /** Verify if user stays on Sign Up page */
    cy.url().should("include", "/SignUp");

    /** ----------- Invalid Format ----------- */
    /** Verify and enter temp password into password input field */
    cy.get("input[name='password'").should("exist").type("wake");

    /** Verify and enter temp password into password confirm input field */
    cy.get("input[name='confirmPassword'").should("exist").type("wake");

    /** Verify if "Continue" button */
    cy.contains("Continue").should("exist").click();

    /** Verify if wrong length password error message appears */
    cy.contains("Password must be 6 or more characters long.").should("exist");

    /** Verify if user stays on Sign Up page */
    cy.url().should("include", "/SignUp");

    /** ----------- Mismatching ----------- */
    /** Verify and enter temp password into password input field */
    cy.get("input[name='password'").should("exist").type("wakemeupwhenyougogo");

    /** Verify and enter temp password into password confirm input field */
    cy.get("input[name='confirmPassword'").should("exist").type("gogowhenyouwakemeup");

    /** Verify if "Continue" button */
    cy.contains("Continue").should("exist").click();

    /** Verify if not matching password error message appears */
    cy.contains("Passwords do not match.").should("exist");

    /** Verify if user stays on Sign Up page */
    cy.url().should("include", "/SignUp");
  })

  it("Failed Sign Up with Existing Account (email)", () => {
    /** Verify and enter temp SPU email into school email input field */
    cy.get("input[name='emailAddress'").as('emailbox').should("exist");
    cy.get("@emailbox").type("user_test@spu.edu");
    
    /** Verify if "Continue" button */
    cy.contains("Continue").should("exist").click();

    /** Verify and enter temp first name into first name input field */
    cy.get("input[name='firstName'").should("exist").type("first");

    /** Verify and enter temp last name into last name input field */
    cy.get("input[name='lastName'").should("exist").type("last");

    /** Verify if "Continue" button */
    cy.contains("Continue").should("exist").click();

    /** Verify and enter temp school ID into school ID input field */
    cy.get("input[name='schoolId'").should("exist").type("900736428");

    /** Verify if "Continue" button */
    cy.contains("Continue").should("exist").click();

    /** Verify and enter temp password into password input field */
    cy.get("input[name='password'").should("exist").type("wakemeupwhenyougogo");

    /** Verify and enter temp password into password confirm input field */
    cy.get("input[name='confirmPassword'").should("exist").type("wakemeupwhenyougogo");

    /** Verify if "Continue" button */
    cy.contains("Continue").should("exist").click();

    /** Verify if existing email error message appears */
    cy.contains("Email address is already used.").should("exist");

    /** Verify if user stays on Sign Up page */
    cy.url().should("include", "/SignUp");
  })

  it("Failed Sign Up with Existing Account (school ID)", () => {
    /** Verify and enter temp SPU email into school email input field */
    cy.get("input[name='emailAddress'").should("exist").type("temp@spu.edu");
    
    /** Verify if "Continue" button */
    cy.contains("Continue").should("exist").click();

    /** Verify and enter temp first name into first name input field */
    cy.get("input[name='firstName'").should("exist").type("first");

    /** Verify and enter temp last name into last name input field */
    cy.get("input[name='lastName'").should("exist").type("last");

    /** Verify if "Continue" button */
    cy.contains("Continue").should("exist").click();

    /** Verify and enter temp school ID into school ID input field */
    cy.get("input[name='schoolId'").should("exist").type("900712662");

    /** Verify if "Continue" button */
    cy.contains("Continue").should("exist").click();

    /** Verify and enter temp password into password input field */
    cy.get("input[name='password'").should("exist").type("wakemeupwhenyougogo");

    /** Verify and enter temp password into password confirm input field */
    cy.get("input[name='confirmPassword'").should("exist").type("wakemeupwhenyougogo");

    /** Verify if "Continue" button */
    cy.contains("Continue").should("exist").click();

    /** Verify if existing email error message appears */
    cy.contains("School ID is already used.").should("exist");

    /** Verify if user stays on Sign Up page */
    cy.url().should("include", "/SignUp");
  })
})

describe("Admin Dashboard & Functionalities", () => {
  beforeEach(() => {
    cy.visit(home);

    /** Verify if the input field for school email */
    cy.get("input[name='emailAddress'").should("exist").type("admin_test@spu.edu");

    /** Verify if "Continue" button */
    cy.contains("Continue").should("exist").click();

    /** Verify if the input field for password */
    cy.get("input[name='password'").should("exist").type("test123");

    /** Verify if "Sign In" button exists */
    cy.contains("Sign In").should("exist").click();

    /** Verify if user is navigated to Dashboard */
    cy.url().should("include", "/Dashboard");
  });

  it("Admin Dashboard Specifications", () => {
    /** Verify if the inventory list exists */
    cy.get(".AdminDashboard-InventorySection").should("exist");

    /** Verify if the reservation section exists*/
    cy.get(".AdminDashboard-ReservationSection").should("exist");

    /** Verify if the "Add Equipment" button exists and functionality works*/
    cy.get(".AdminDashboard-AddEquipmentButton").should("exist").click();
    cy.url().should("include", "/AddToInventory");
  });

  it("Navigation Bar for Admin", () => {
    //#region Verify if the admin-specific buttons exist and work correctly
    /** Verify Inventory Navigation */
    cy.get(".NavigationBarButton-InventoryButton").as('invenbtn').should("exist");
    cy.get("@invenbtn").click();
    cy.url().should("include", "/Inventory");

    /** Verify Add To Inventory Navigation */
    cy.get(".NavigationBarButton-AddEquipmentButton").as('addeqbtn').should("exist");
    cy.get("@addeqbtn").click();
    cy.url().should("include", "/AddToInventory");
    
    /** Verify Users Navigation */
    cy.get(".NavigationBarButton-UsersButton").as('usersbtn').should("exist");
    cy.get("@usersbtn").click();
    cy.url().should("include", "/Users");
    //#endregion

    //#region Verify if the general buttons exist and work correctly
    /** Verify Dashboard Navigation */
    cy.get(".NavigationBarButton-DashboardButton").as('dashbtn').should("exist");
    cy.get("@dashbtn").click();
    cy.url().should("include", "/Dashboard");

    /** Verify Reservations Navigation */
    cy.get(".NavigationBarButton-ReservationsButton").as('resbtn').should("exist");
    cy.get("@resbtn").click();
    cy.url().should("include", "/Reservations");

    /** Verify Notifications Navigation */
    cy.get(".NavigationBarButton-NotificationsButton").as('notifybtn').should("exist");
    cy.get("@notifybtn").click();
    cy.url().should("include", "/Notifications");

    /** Verify Settings Navigation */
    cy.get(".NavigationBarButton-SettingsButton").as('setbtn').should("exist");
    cy.get("@setbtn").click();
    cy.url().should("include", "/Settings");

    /** Verify Sign Out Navigation */
    cy.get(".NavigationBarButton-SignOutButton").as('signoutbtn').should("exist");
    cy.get("@signoutbtn").click();
    cy.url().should("eq", 'http://localhost:3000/');
    //#endregion
  });
});

describe("Faculty Dashboard & Functionalities", () => {
  beforeEach(() => {
    cy.visit(home);

    /** Verify if the input field for school email */
    cy.get("input[name='emailAddress'").should("exist").type("faculty_test@spu.edu");

    /** Verify if "Continue" button */
    cy.contains("Continue").should("exist").click();

    /** Verify if the input field for password */
    cy.get("input[name='password'").should("exist").type("test123");

    /** Verify if "Sign In" button exists */
    cy.contains("Sign In").should("exist").click();

    /** Verify if user is navigated to Dashboard */
    cy.url().should("include", "/Dashboard");
  });

  it("Faculty-Dashboard Specified", () => {
    /** Verify if the Equipment Usage Section that contains two filters - "Currently Using" and "Recently Used" exist */
    cy.get(".FacultyDashboard-EquipmentFilterSection").should("exist");
    cy.get(".FacultyDashboard-EquipmentFilterCardList").should("exist");
    cy.contains("Currently Using").should("exist");
    cy.contains("Recently Used").should("exist");

    /** Verify if the "Make Reservation" exists and functionality works */
    cy.get(".FacultyDashboard-MakeReservationButton").should("exist").click();
    cy.url().should("include", "/Reservations");
  });

  it("Navigation Bar for Faculty", () => {
    /** Verify Dashboard Navigation */
    cy.get(".NavigationBarButton-DashboardButton").as('dashbtn').should("exist");
    cy.get("@dashbtn").click();
    cy.url().should("include", "/Dashboard");

    /** Verify Reservations Navigation */
    cy.get(".NavigationBarButton-ReservationsButton").as('resbtn').should("exist");
    cy.get("@resbtn").click();
    cy.url().should("include", "/Reservations");

    /** Verify Notifications Navigation */
    cy.get(".NavigationBarButton-NotificationsButton").as('notifybtn').should("exist");
    cy.get("@notifybtn").click();
    cy.url().should("include", "/Notifications");

    /** Verify Settings Navigation */
    cy.get(".NavigationBarButton-SettingsButton").as('setbtn').should("exist");
    cy.get("@setbtn").click();
    cy.url().should("include", "/Settings");

    /** Verify Sign Out Navigation */
    cy.get(".NavigationBarButton-SignOutButton").as('signoutbtn').should("exist");
    cy.get("@signoutbtn").click();
    cy.url().should("eq", 'http://localhost:3000/');
  });
})

describe("Student Dashboard & Functionalities", () => {
  beforeEach(() => {
    cy.visit(home);

    /** Verify if the input field for school email */
    cy.get("input[name='emailAddress'").should("exist").type("student_test@spu.edu");

    /** Verify if "Continue" button */
    cy.contains("Continue").should("exist").click();

    /** Verify if the input field for password */
    cy.get("input[name='password'").should("exist").type("test123");

    /** Verify if "Sign In" button exists */
    cy.contains("Sign In").should("exist").click();

    /** Verify if user is navigated to Dashboard */
    cy.url().should("include", "/Dashboard");
  });

  it("Dashboard for Student", () => {
    /** Verify if the Equipment Usage Section that contains two filters - "Currently Using" and "Recently Used" exist */
    cy.get(".StudentDashboard-EquipmentFilterSection").should("exist");
    cy.get(".StudentDashboard-EquipmentFilterCardList").should("exist");
    cy.contains("Currently Using").should("exist");
    cy.contains("Recently Used").should("exist");
    
    /** Verify if the "Make Reservation" exists and functionality works */
    cy.get(".StudentDashboard-MakeReservationButton").should("exist").click();
    cy.url().should("include", "/Reservations");
  });

  it("Navigation Bar for Student", () => {
    /** Verify Dashboard Navigation */
    cy.get(".NavigationBarButton-DashboardButton").as('dashbtn').should("exist");
    cy.get("@dashbtn").click();
    cy.url().should("include", "/Dashboard");

    /** Verify Reservations Navigation */
    cy.get(".NavigationBarButton-ReservationsButton").as('resbtn').should("exist");
    cy.get("@resbtn").click();
    cy.url().should("include", "/Reservations");

    /** Verify Notifications Navigation */
    cy.get(".NavigationBarButton-NotificationsButton").as('notifybtn').should("exist");
    cy.get("@notifybtn").click();
    cy.url().should("include", "/Notifications");

    /** Verify Settings Navigation */
    cy.get(".NavigationBarButton-SettingsButton").as('setbtn').should("exist");
    cy.get("@setbtn").click();
    cy.url().should("include", "/Settings");

    /** Verify Sign Out Navigation */
    cy.get(".NavigationBarButton-SignOutButton").as('signoutbtn').should("exist");
    cy.get("@signoutbtn").click();
    cy.url().should("eq", 'http://localhost:3000/');
  });
});
