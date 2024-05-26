/** Constants ------------------------------------- */
const home = "/";
const admin_email = "admin_test@spu.edu";
const faculty_email = "faculty_test@spu.edu";
const student_email = "student_test@spu.edu";
const password = "test123";

/** Getting today's date in mm/dd/yyyy */
const today = new Date();
const dd = String(today.getDate()).padStart(2, '0');
const mm = String(today.getMonth() + 1).padStart(2, '0');
const yyyy = today.getFullYear();

const todayDate = mm + '/' + dd + '/' + yyyy;

/** Getting date a week later in mm/dd/yyyy */
const weekLater = new Date();
weekLater.setDate(today.getDate() + 7);
const ddNew = String(weekLater.getDate()).padStart(2, '0');
const mmNew = String(weekLater.getMonth() + 1).padStart(2, '0');
const yyyyNew = weekLater.getFullYear();

const newDate = mmNew + '/' + ddNew + '/' + yyyyNew;

/** Reformatting the dates */
const day = String(today.getDate());
const month = String(today.getMonth() + 1);
const dayNew = String(weekLater.getDate());
const monthNew = String(weekLater.getMonth() + 1);

const todayDateReformat = month + '/' + day + '/' + yyyy;
const newDateReformat = monthNew + '/' + dayNew + '/' + yyyyNew;

/**
 * Dev App Loaded and Running Test
 * Makes sure the dev app is up and running before the tests are run.
 */
describe('Web App Successfully Loaded', () => {
  it('Dev App Loaded Up', () => {
    cy.visit(home)
  });
});

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
    cy.get("input[name='emailAddress'").should("exist").type(admin_email);

    /** Verify if "Continue" button */
    cy.contains("Continue").should("exist").click();
  
    /** Verify if the input field for password */
    cy.get("input[name='password'").should("exist").type(password);
  
    /** Verify if "Sign In" button exists */
    cy.contains("Sign In").should("exist").click();

    /** Verify if user is navigated to Dashboard */
		cy.url().should("include", "/Dashboard");
  });

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
    cy.get("input[name='emailAddress'").should("exist").clear().type("user_test@.com");

    /** Verify if "Continue" button */
    cy.contains("Continue").should("exist").click();

    /** Verify if valid email address error message appears */
    cy.contains("Please enter a valid school email address.").should("exist");

    /** Verify if user stays on the current page */
    cy.url().should("include", "/");
  });

  it("Failed Sign In with Invalid Password", () => {
    /** Verify if the input field for school email */
    cy.get("input[name='emailAddress'").should("exist").type(admin_email);

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
  });

  it("Failed Sign In with Unknown Email", () => {
    /** Verify if the input field for school email */
    cy.get("input[name='emailAddress'").should("exist").type("who_is_this@spu.edu");

    /** Verify if "Continue" button */
    cy.contains("Continue").should("exist").click();

    /** Verify if the input field for password */
    cy.get("input[name='password'").should("exist").type(password);

    /** Verify if "Sign In" button exists */
    cy.contains("Sign In").should("exist").click();

    /** Verify if invalid credentials error message appears */
    cy.contains("Invalid credentials.").should("exist");

    /** Verify if user stays on the current page */
    cy.url().should("include", "/");
  });
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
  });

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
  });

  it("Failed Sign Up with Invalid Email", () => {
    /** ----------- Missing ----------- */
    /** Verify if "Continue" button */
    cy.contains("Continue").as('conbtn').should("exist");
    cy.get("@conbtn").click();

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
    cy.get("input[name='emailAddress'").should("exist").clear().type("wii@.com");

    /** Verify if "Continue" button */
    cy.contains("Continue").should("exist").click();

    /** Verify if valid email address error message appears */
    cy.contains("Please enter a valid school email address.").should("exist");

    /** Verify if user stays on the current page */
    cy.url().should("include", "/SignUp");
  });

  it("Failed Sign Up with No First Name", () => {
    /** Verify and enter temp SPU email into school email input field */
    cy.get("input[name='emailAddress'").as('emailinput').should("exist");
    cy.get("@emailinput").type("temp@spu.edu");
    
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
  });

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
  });

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
    cy.get("input[name='schoolId'").should("exist").clear().type("900111222333444");

    /** Verify if "Continue" button */
    cy.contains("Continue").should("exist").click();

    /** Verify if school ID error message appears */
    cy.contains("Please enter a valid school ID.").should("exist");

    /** Verify if user stays on Sign Up page */
    cy.url().should("include", "/SignUp");
  });

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
    cy.get("input[name='password'").should("exist").clear().type("wakemeupwhenyougogo");

    /** Verify and enter temp password into password confirm input field */
    cy.get("input[name='confirmPassword'").should("exist").clear().type("gogowhenyouwakemeup");

    /** Verify if "Continue" button */
    cy.contains("Continue").should("exist").click();

    /** Verify if not matching password error message appears */
    cy.contains("Passwords do not match.").should("exist");

    /** Verify if user stays on Sign Up page */
    cy.url().should("include", "/SignUp");
  });

  it("Failed Sign Up with Existing Account (email)", () => {
    /** Verify and enter temp SPU email into school email input field */
    cy.get("input[name='emailAddress'").as('emailbox').should("exist");
    cy.get("@emailbox").type(student_email);
    
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
  });

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
    cy.get("input[name='schoolId'").should("exist").type("800281127");

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
  });
});

describe("Admin Main Dashboard & Nav Bar", () => {
  beforeEach(() => {
    cy.visit(home);

    /** Verify if the input field for school email */
    cy.get("input[name='emailAddress'").should("exist").type(admin_email);

    /** Verify if "Continue" button */
    cy.contains("Continue").should("exist").click();

    /** Verify if the input field for password */
    cy.get("input[name='password'").should("exist").type(password);

    /** Verify if "Sign In" button exists */
    cy.contains("Sign In").should("exist").click();

    /** Verify if user is navigated to Dashboard */
    cy.url().should("include", "/Dashboard");
  });

  it("Dashboard UI Specifications", () => {
    /** Verify if the inventory list exists */
    cy.get(".AdminDashboard-InventorySection").should("exist");

    /** Verify if the reservation section exists */
    cy.get(".AdminDashboard-ReservationSection").should("exist");

    /** Verify if search bar exists */
    cy.get(".AdminDashboard-SearchBar").should("exist");

    /** Verify if reservation filters exist */
    cy.get(".AdminDashboard-ReservationFilterContainer").should("exist");

    /** Verify if the "Add Equipment" button exists and functionality works */
    cy.get(".AdminDashboard-AddEquipmentButton").should("exist").click();
    cy.url().should("include", "/AddToInventory");
  });

  it("Navigation Bar", () => {
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

describe("Admin Reservation Page", () => {
  beforeEach(() => {
    cy.visit(home);

    /** Verify if the input field for school email */
    cy.get("input[name='emailAddress'").should("exist").type(admin_email);

    /** Verify if "Continue" button */
    cy.contains("Continue").should("exist").click();

    /** Verify if the input field for password */
    cy.get("input[name='password'").should("exist").type(password);

    /** Verify if "Sign In" button exists */
    cy.contains("Sign In").should("exist").click();

    /** Verify if user is navigated to Dashboard */
    cy.url().should("include", "/Dashboard");

    /** Verify Reservations Navigation */
    cy.get(".NavigationBarButton-ReservationsButton").as('resbtn').should("exist");
    cy.get("@resbtn").click();
    cy.url().should("include", "/Reservations");
  });

  it("Reservation Page UI", () => {
    /** Assuming 1st item in reservation inventory list has 3 or more items: */

    /** Verify if search bar exists */
    cy.get(".ReservationsPage-SearchBar").should("exist");

    /** Verify if date input fields exists */
    cy.get("input[name='startDate'").should("exist");
    cy.get("input[name='endDate'").should("exist");

    /** Verify if your reservations button exists */
    cy.get(".ReservationsPage-YourReservationsButton").should("exist");

    /** Verify if Reserve button exists and click it */
    cy.contains("Reserve").should("exist").click({force: true});

    /** Verify if checkbox(es) exist*/
    cy.get("button[class='IconButton-Container AvailableModelCard-SelectButton']").should("exist").click();

    /** Verify if next button exists */
    cy.get(".ReservationsPage-ContinueButton").eq(0).should("exist").click();

    /** Verify if switches to specify quantity */
    cy.contains("Specify Quantity").should("exist");

    /** Verify if plus button exists and click it 2 times (index to distinguish) */
    cy.get("button[class='IconButton-Container SpecifyModelQuantityCard-QuantityUpdateButton']").eq(0).should("exist").click();
    cy.get("button[class='IconButton-Container SpecifyModelQuantityCard-QuantityUpdateButton']").eq(0).should("exist").click();

    /** Verify if quantity is now 3 */
    cy.contains("3").should("exist");

    /** Verify if minus button exists and click it 2 times (index to distinguish) */
    cy.get("button[class='IconButton-Container SpecifyModelQuantityCard-QuantityUpdateButton']").eq(1).should("exist").click();
    cy.get("button[class='IconButton-Container SpecifyModelQuantityCard-QuantityUpdateButton']").eq(1).should("exist").click();

    /** Verify if quantity is now 3 */
    cy.contains("1").should("exist");

    /** Verify if equipment info card exists */
    cy.get(".SpecifyModelQuantityCard-Container").should("exist");

    /** Verify and click the next button */
    cy.get("button[class='ReservationsPage-ContinueButton StandardButton-Container']").eq(0).should("exist").click();

    /** Verify if arrived at confirmation section */
    cy.contains("Confirm Reservation").should("exist");

    /** Verify if reservation dates shown (default) */
    cy.contains(todayDate + " - " + todayDate).should("exist");
    cy.get(".ReservationsPage-ReservationConfirmationDateContainer").should("exist");

    /** Verify if confirmation reservation details list exists */
    cy.contains("Details").should("exist");
    cy.get(".ReservationConfirmationDetailsList-Container").should("exist");

    /** Verify if correct quantity is shown */
    cy.contains("Quantity: 1").should("exist");

    /** Verify the confirm button */
    cy.contains("Confirm").should("exist");

    /** Now go back */
    /** Verify the back button */
    cy.get("button[class='IconButton-Container ReservationsPage-BackButton']").eq(0).should("exist").click({force: true});

    /** Verify if switches to specify quantity */
    cy.contains("Specify Quantity").should("exist");

    /** Verify the back button for this page */
    cy.get("button[class='IconButton-Container ReservationsPage-BackButton']").eq(0).should("exist").click({force: true});

    /** Verify if cancel button exists and works */
    cy.contains("Cancel").should("exist").click({force: true});
    cy.contains("Reserve").should("exist");
  });

  it("Hidden Reservation List Page UI", () => {
    /** Assuming 1 requested reservation & 3 approved, 2 admin and 1 non-admin */

    /** Verify if your reservations button exists & click it */
    cy.get(".ReservationsPage-YourReservationsButton").eq(0).should("exist").click();

    /** Check if reservation list exists */
    cy.get(".ReservationList-Container.ReservationsPage-ReservationList");

    /** Check if date input fields exist and input into them */
    cy.get("input[name='startDate'").clear().type(todayDate);
    cy.get("input[name='endDate'").clear().type(newDate);

    /** Check if reservation list is now empty */
    cy.contains("There are no reservations.").should("exist");

    /** Now clear the date input fields */
    cy.get("input[name='startDate'").clear();
    cy.get("input[name='endDate'").clear();

    /** Check if "Only Your Reservations" checkbox exist and click it */
    cy.get("button[class='IconButton-Container ReservationsPage-OnlyYourReservationsButton']").should("exist").click();

    /**TODO: Check if reservation list updates to admin-only reservations */
    // cy.get("div[class='ReservationList-Container ReservationsPage-ReservationList']").should('have.length', 2);

    /** Check if Requested filter button exists and click it */
    cy.contains("Requested").click();

    /**TODO: Check if requested student/faculty reservation list exists */
    // cy.contains(".ReservationList-Container.ReservationsPage-ReservationList").should('have.length', 1);

    /**TODO: Click on the 1 requested reservation */

    /**TODO: Check if reservation details show */

    /**TODO: Check if approve reservation button exists */

    /**TODO: Check if reject reservation button exists */

    /**TODO: Check if Approved filter button exists and click it */

    /**TODO: Click on 1st approved reservation */

    /**TODO: Check if reservation details show */

    /**TODO: Check if back button exists and click it */

    /**TODO: Check if returned to make reservation page and enter reservations page again */
    
    /**TODO: Check if Make a Reservation button exists and click it */

    /**TODO: Check if also returned to make reservation page */
  });

  it("Successful Create Reservation", () => {
    /** Assuming 1st item in reservation inventory list has 3 or more items: */
    /** Input the dates */
    cy.get("input[name='startDate'").eq(1).clear().type(todayDate);
    cy.get("input[name='endDate'").eq(1).clear().type(newDate);

    /** Click Reserve button */
    cy.contains("Reserve").click({force: true});

    /** Click on the 1st checkbox*/
    cy.get("button[class='IconButton-Container AvailableModelCard-SelectButton']").should("exist").click();

    /** Click on the next button */
    cy.get(".ReservationsPage-ContinueButton").eq(0).should("exist").click();
    
    /** Click on the plus button 2 times */
    cy.get("button[class='IconButton-Container SpecifyModelQuantityCard-QuantityUpdateButton']").eq(0).should("exist").click();
    cy.get("button[class='IconButton-Container SpecifyModelQuantityCard-QuantityUpdateButton']").eq(0).should("exist").click();

    /** Click the next button */
    cy.get("button[class='ReservationsPage-ContinueButton StandardButton-Container']").eq(0).should("exist").click();

    /** Click the confirm button */
    cy.get("button[class='ReservationsPage-ConfirmButton StandardButton-Container']").eq(0).should("exist").click();

    /** Go to the Dashboard */
    cy.get(".NavigationBarButton-DashboardButton").as('dashbtn').should("exist");
    cy.get("@dashbtn").click();

    /** Confirm that the reservation has been successfully created and is displayed */
    cy.contains(todayDateReformat).should("exist");
    cy.contains(newDateReformat).should("exist");
    cy.contains("Test, Admin").should("exist");
    cy.contains(":").should("exist");
    cy.contains("3 items").should("exist");
  });

  it("Successful Cancel Reservation", () => {
    /** Go to the Dashboard */
    cy.get(".NavigationBarButton-DashboardButton").as('dashbtn').should("exist");
    cy.get("@dashbtn").click();

    /** Click on the reservation */
    cy.get("button[class=' ReservationCard-Container ']").eq(0).should("exist").click();

    /** Click the Cancel button */
    cy.contains("Cancel").should("be.visible").click();

    /** Confirm that the reservation was cancelled :D */
    cy.contains("There are no upcoming reservations.").should("exist");
  });
});

describe("Admin Inventory Page", () => {
    beforeEach(() => {
        cy.visit(home);
    
        /** Verify if the input field for school email */
        cy.get("input[name='emailAddress'").should("exist").type(admin_email);
    
        /** Verify if "Continue" button */
        cy.contains("Continue").should("exist").click();
    
        /** Verify if the input field for password */
        cy.get("input[name='password'").should("exist").type(password);
    
        /** Verify if "Sign In" button exists */
        cy.contains("Sign In").should("exist").click();
    
        /** Verify if user is navigated to Dashboard */
        cy.url().should("include", "/Dashboard");
    
        /** Verify Inventory Navigation */
        cy.get(".NavigationBarButton-InventoryButton").as('invenbtn').should("exist");
        cy.get("@invenbtn").click();
        cy.url().should("include", "/Inventory");
      });

      it("Successful Add Type", () => {
        /** Click on Type tab */

        /** Click on "Add Type" button */

        /** Type in type name "a bad game" */

        /** Click on "Add Type" button again */

        /** Return to Inventory page */
        cy.get(".NavigationBarButton-InventoryButton").as('invenbtn').should("exist");
        cy.get("@invenbtn").click();
        cy.url().should("include", "/Inventory");

        /** Click on Type tab */

        /** Check if Type "a bad game" exists */
      });

      it("Successful Edit Type", () => {
        /** Click on Type tab */

        /** Click on checkbox next to "a bad game" */

        /** Click on "Edit" button */

        /** Change type name to "a blastingly fun game" */

        /** Click on the "Save button" */

        /** Click on the back button */

        /** Check if Type "a blastingly fun game" exists */
      });

      it("Successful Delete Type", () => {
        /** Click on Type tab */

        /** Click on checkbox next to "a blastingly fun game" */

        /** Click on the trash can button */

        /** Click the "Yes" button on the pop-up */

        /** Type "a blastingly fun game" should not exist */
      });
      
      it("Successful Add Model", () => {
        /** Click on Model tab */

        /** Click on "Add Model" button */

        /** Type in dummy model name "NINTENDO-SWITCH" */

        /** Select type (1st choice) */

        /** Upload example image */

        /** Click on "Add Model" button again */

        /** Return to Inventory page */
        cy.get(".NavigationBarButton-InventoryButton").as('invenbtn').should("exist");
        cy.get("@invenbtn").click();
        cy.url().should("include", "/Inventory");

        /** Click on Model tab */

        /** Check if Model "NINTENDO-SWITCH" exists */
      });

      it("Successful Edit Model", () => {
        /** Click on Model tab */

        /** Click on checkbox next to "NINTENDO-SWITCH" */

        /** Click on "Edit" button */

        /** Change model name to "NINTENDO-WII" */

        /** Change uploaded image */

        /** Click on the "Save button" */

        /** Click on the back button */

        /** Check if Model "NINTENDO-WII" exists */
      });

      it("Successful Delete Model", () => {
        /** Click on Model tab */

        /** Click on checkbox next to "NINTENDO-WII" */

        /** Click on the trash can button */

        /** Click the "Yes" button on the pop-up */

        /** Model "NINTENDO-WII" should not exist */
      });

      it("Successful Add RFID Antenna", () => {
        /** Click on RFID Antenna tab */

        /** Click on "Add Antenna" button */

        /** Type in dummy antenna ID "wii u" */

        /** Select location (1st choice) */

        /** Click on "Add Antenna" button again */

        /** Return to Inventory page */
        cy.get(".NavigationBarButton-InventoryButton").as('invenbtn').should("exist");
        cy.get("@invenbtn").click();
        cy.url().should("include", "/Inventory");

        /** Click on RFID Antenna tab */

        /** Check if Antenna "wii u" exists */
      });

      it("Successful Edit RFID Antenna", () => {
        /** Click on RFID Antenna tab */

        /** Click on checkbox next to "wii u" */

        /** Click on "Edit" button */

        /** Change model name to "3ds" */

        /** Click on the "Save button" */

        /** Click on the back button */

        /** Check if Antenna "3ds" exists */
      });

      it("Successful Delete RFID Antenna", () => {
        /** Click on RFID Antenna tab */

        /** Click on checkbox next to "3ds" */

        /** Click on the trash can button */

        /** Click the "Yes" button on the pop-up */

        /** Antenna "3ds" should not exist */
      });

      it("Successful Add Location", () => {
        /** Click on Location tab */

        /** Click on "Add Location" button */

        /** Type in dummy Location name "Japan" */

        /** Click on "Add Location" button again */

        /** Return to Inventory page */
        cy.get(".NavigationBarButton-InventoryButton").as('invenbtn').should("exist");
        cy.get("@invenbtn").click();
        cy.url().should("include", "/Inventory");

        /** Click on Location tab */

        /** Check if Location "Japan" exists */
      });

      it("Successful Edit Location", () => {
        /** Click on Location tab */

        /** Find location w/ name "Japan" & click on it */

        /** Click on "Edit" button */

        /** Change location name to "America" */

        /** Click on the "Save button" */

        /** Click on the back button */

        /** Check if Location "America" exists */
      });

      it("Successful Delete Location", () => {
        /** Click on Location tab */

        /** Find location w/ name "America" & click on it */

        /** Click on the trash can button */

        /** Click the "Yes" button on the pop-up */

        /** Location "America" should not exist */
      });

      it("Successful Add Equipment", () => {
        /** Click on "Add Equippment" button */
        cy.contains("Add Equipment").should("exist").click();

        /** Type in dummy serial number AL-O51D00R2ALL3N8E */

        /** Select a type (1st choice) */

        /** Select a model (1st choice) */

        /** Select maintenance status ("Ready") */

        /** Type in RFID Tag ("TBD") */

        /** Select home location (1st choice) */

        /** Select condition ("New") */
        
        /** Type in purchase cost ($7.83) */

        /** Type in purchase date (9/3/2021) */

        /** Click on 2nd "Add Equippment" button */

        /** Go back to Inventory page */

        /** Find added equipment w/ serial ID AL-O51D00R2ALL3N8E & click on it */

        /** Check that rest of info is correct */
      });

      it("Successful Edit Equipment", () => {
        /** Find equipment w/ serial ID AL-O51D00R2ALL3N8E & click on it */

        /** Click on "Edit" button */

        /** Change model to 2nd one (assuming one's available) */

        /** Change status to "Under Repair" */

        /** Add home location */

        /** Change condition to "Used" */

        /** Change number of items to 1 */

        /** Change purchase date to 12/17/2020 */

        /** Click on save button */

        /** Click on back button */

        /** Check that most info's been changed */
      });

      it("Successful Delete Equipment", () => {
        /** Find equipment w/ serial ID AL-O51D00R2ALL3N8E & click on it */

        /** Click on trash can button */

        /** Click on "Yes" button of pop-up */

        /** Equipment w/ serial ID AL-O51D00R2ALL3N8E should not exist */
      });
});

describe("Faculty Main Dashboard & Nav Bar", () => {
  beforeEach(() => {
    cy.visit(home);

    /** Verify if the input field for school email */
    cy.get("input[name='emailAddress'").should("exist").type(faculty_email);

    /** Verify if "Continue" button */
    cy.contains("Continue").should("exist").click();

    /** Verify if the input field for password */
    cy.get("input[name='password'").should("exist").type(password);

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
});

describe("Student Dashboard & Nav Bar", () => {
  beforeEach(() => {
    cy.visit(home);

    /** Verify if the input field for school email */
    cy.get("input[name='emailAddress'").should("exist").type(student_email);

    /** Verify if "Continue" button */
    cy.contains("Continue").should("exist").click();

    /** Verify if the input field for password */
    cy.get("input[name='password'").should("exist").type(password);

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
