/** Constants ------------------------------------- */
const home = "/";
const prod_admin_email = "seattlepacificuniversity@spu.edu"; //replace instances with dev_admin_email for dev testing and vice versa
const prod_faculty_email = "prod_faculty_test@spu.edu"; //replace instances with dev_faculty_email for dev testing and vice versa
const prod_student_email = "prod_student_test@spu.edu"; //replace instances with dev_student_email for dev testing and vice versa
const prod_admin_password = "SeattlePacificUniversity!"; //replace instances with dev_admin_password for dev testing and vice versa
const prod_faculty_password = "test123"; //replace instances with dev_faculty_password for dev testing and vice versa
const prod_student_password = "test123"; //replace instances with dev_student_password for dev testing and vice versa
const prod_student_id = "000000002"; //replace instances with dev_student_id for dev testing and vice versa
const prod_url = 'https://spu-etc.netlify.app/'; //replace instances with dev_url for dev testing and vice versa
const dev_admin_email = "admin_test@spu.edu";
const dev_faculty_email = "faculty_test@spu.edu";
const dev_student_email = "student_test@spu.edu";
const dev_admin_password = "test123";
const dev_faculty_password = "test123";
const dev_student_password = "test123";
const dev_student_id = "900712662";
const dev_url = 'http://localhost:3000/';

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

/** Getting date 2 weeks later in mm/dd/yyyy */
const twoWeeksLater = new Date();
twoWeeksLater.setDate(today.getDate() + 14);
const ddNewTwo = String(twoWeeksLater.getDate()).padStart(2, '0');
const mmNewTwo = String(twoWeeksLater.getMonth() + 1).padStart(2, '0');
const yyyyNewTwo = twoWeeksLater.getFullYear();

const newTwoDate = mmNewTwo + '/' + ddNewTwo + '/' + yyyyNewTwo;

/** Reformatting the dates */
const day = String(today.getDate());
const month = String(today.getMonth() + 1);
const dayNew = String(weekLater.getDate());
const monthNew = String(weekLater.getMonth() + 1);
const dayTwoNew = String(twoWeeksLater.getDate());
const monthTwoNew = String(twoWeeksLater.getMonth() + 1);

const todayDateReformat = month + '/' + day + '/' + yyyy;
const newDateReformat = monthNew + '/' + dayNew + '/' + yyyyNew;
const newTwoDateReformat = monthTwoNew + '/' + dayTwoNew + '/' + yyyyNewTwo;

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
    cy.get("input[name='emailAddress'").should("exist").type(prod_admin_email);

    /** Verify if "Continue" button */
    cy.contains("Continue").should("exist").click();
  
    /** Verify if the input field for password */
    cy.get("input[name='password'").should("exist").type(prod_admin_password);
  
    /** Verify if "Sign In" button exists */
    cy.contains("Sign In").should("exist").click();
    cy.wait(2000);

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
    cy.get("input[name='emailAddress'").should("exist").type(prod_admin_email);

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
    cy.get("input[name='password'").should("exist").type(prod_admin_password);

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
    cy.get("input[name='emailAddress']").as('emailinput').should("exist");
    cy.get('@emailinput').type("temp@spu.edu");
    
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
    cy.get("input[name='emailAddress']").as('emailinput').should("exist");
    cy.get('@emailinput').type("temp@spu.edu");
    
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
    cy.get("input[name='emailAddress']").as('emailinput').should("exist");
    cy.get('@emailinput').type("temp@spu.edu");
    
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
    cy.get("input[name='emailAddress']").as('emailinput').should("exist");
    cy.get('@emailinput').type("temp@spu.edu");
    
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
    cy.get("input[name='emailAddress']").as('emailbox').should("exist");
    cy.get("@emailbox").type(prod_faculty_email);
    
    /** Verify if "Continue" button */
    cy.contains("Continue").should("exist").click();

    /** Verify and enter temp first name into first name input field */
    cy.get("input[name='firstName']").should("exist").type("first");

    /** Verify and enter temp last name into last name input field */
    cy.get("input[name='lastName']").should("exist").type("last");

    /** Verify if "Continue" button */
    cy.contains("Continue").should("exist").click();

    /** Verify and enter temp school ID into school ID input field */
    cy.get("input[name='schoolId']").should("exist").type("900736428");

    /** Verify if "Continue" button */
    cy.contains("Continue").should("exist").click();

    /** Verify and enter temp password into password input field */
    cy.get("input[name='password']").should("exist").type("wakemeupwhenyougogo");

    /** Verify and enter temp password into password confirm input field */
    cy.get("input[name='confirmPassword']").should("exist").type("wakemeupwhenyougogo");

    /** Verify if "Continue" button */
    cy.contains("Continue").should("exist").click();

    /** Verify if existing email error message appears */
    cy.contains("Email address is already used.").should("exist");

    /** Verify if user stays on Sign Up page */
    cy.url().should("include", "/SignUp");
  });

  it("Failed Sign Up with Existing Account (school ID)", () => {
    /** Verify and enter temp SPU email into school email input field */
    cy.get("input[name='emailAddress']").as('emailbox').should("exist");
    cy.get("@emailbox").type("temp@spu.edu");
    
    /** Verify if "Continue" button */
    cy.contains("Continue").should("exist").click();

    /** Verify and enter temp first name into first name input field */
    cy.get("input[name='firstName']").should("exist").type("first");

    /** Verify and enter temp last name into last name input field */
    cy.get("input[name='lastName']").should("exist").type("last");

    /** Verify if "Continue" button */
    cy.contains("Continue").should("exist").click();

    /** Verify and enter temp school ID into school ID input field */
    cy.get("input[name='schoolId'").should("exist").type(prod_student_id);

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

/**
 * Admin Dashboard & Nav Tests
 * Checks the basic UI & functionality of admin user's dashboard & navigation bar
 * Success: all needed UI components in admin works as expected
 */
describe("Admin Main Dashboard & Nav Bar", () => {
  beforeEach(() => {
    cy.visit(home);

    /** Verify if the input field for school email */
    cy.get("input[name='emailAddress'").should("exist").type(prod_admin_email);

    /** Verify if "Continue" button */
    cy.contains("Continue").should("exist").click();

    /** Verify if the input field for password */
    cy.get("input[name='password'").should("exist").type(prod_admin_password);

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
    cy.wait(3000);

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

    /** Verify RFID Tags Navigation */
    cy.get(".NavigationBarButton-RFIDTagsButton").as('rfidbtn').should("exist");
    cy.get("@rfidbtn").click();
    cy.url().should("include", "/RFIDTags");

    /** Verify Settings Navigation */
    cy.get(".NavigationBarButton-SettingsButton").as('setbtn').should("exist");
    cy.get("@setbtn").click();
    cy.url().should("include", "/Settings");

    /** Verify Sign Out Navigation */
    cy.get(".NavigationBarButton-SignOutButton").as('signoutbtn').should("exist");
    cy.get("@signoutbtn").click();
    cy.url().should("eq", prod_url);
    //#endregion
  });
});

/**
 * Admin Reservation Tests
 * Tests admin reservation system's UI and functionalities
 * Contains first success then error test cases
 * Success: make and cancel admin-created reservations & UI works as expected
 * Fail: invalid start/end dates
 */
describe("Admin Reservation Page", () => {
  beforeEach(() => {
    cy.visit(home);

    /** Verify if the input field for school email */
    cy.get("input[name='emailAddress'").should("exist").type(prod_admin_email);

    /** Verify if "Continue" button */
    cy.contains("Continue").should("exist").click();

    /** Verify if the input field for password */
    cy.get("input[name='password'").should("exist").type(prod_admin_password);

    /** Verify if "Sign In" button exists */
    cy.contains("Sign In").should("exist").click();
    cy.wait(2000);

    /** Verify if user is navigated to Dashboard */
    cy.url().should("include", "/Dashboard");

    /** Verify Reservations Navigation */
    cy.get(".NavigationBarButton-ReservationsButton").as('resbtn').should("exist");
    cy.get("@resbtn").click({force: true});
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
    cy.get("button[class='IconButton-Container AvailableModelCard-SelectButton']").eq(0).should("exist").click();

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
    cy.get("input[name='startDate'").clear().type("04/11/2023");
    cy.get("input[name='endDate'").clear().type("06/15/2023");

    /** Check if reservation list is now empty */
    cy.contains("There are no reservations.").should("exist");

    /** Now clear the date input fields */
    cy.get("input[name='startDate'").clear();
    cy.get("input[name='endDate'").clear();

    /** Check if "Only Your Reservations" checkbox exist and click it */
    cy.get("button[class='IconButton-Container ReservationsPage-OnlyYourReservationsButton']").should("exist").click();

    // /**TODO: Check if reservation list updates to admin-only reservations */
    // cy.get("div[class='ReservationList-Container ReservationsPage-ReservationList']");

    // /** Check if Requested filter button exists and click it */
    // cy.contains("Requested").click();

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
    cy.wait(1000);

    /** Click on the 1st checkbox*/
    cy.get("button[class='IconButton-Container AvailableModelCard-SelectButton']").eq(0).should("exist").click();

    /** Click on the next button */
    cy.get(".ReservationsPage-ContinueButton").eq(0).should("exist").click();
    
    /** Click on the plus button 2 times */
    cy.get("button[class='IconButton-Container SpecifyModelQuantityCard-QuantityUpdateButton']").eq(0).should("exist").click();
    cy.get("button[class='IconButton-Container SpecifyModelQuantityCard-QuantityUpdateButton']").eq(0).should("exist").click();

    /** Click the next button */
    cy.get("button[class='ReservationsPage-ContinueButton StandardButton-Container']").eq(0).should("exist").click();

    /** Click the confirm button */
    cy.get("button[class='ReservationsPage-ConfirmButton StandardButton-Container']").eq(0).should("exist").click();
    cy.wait(8000);

    /** Go to the Dashboard */
    cy.get(".NavigationBarButton-DashboardButton").as('dashbtn').should("exist");
    cy.get("@dashbtn").click({force:true});

    /** Confirm that the reservation has been successfully created and is displayed */
    cy.contains(todayDateReformat).should("exist");
    cy.contains(newDateReformat).should("exist");
    cy.contains("3 items").should("exist");
  });

  it("Successful Cancel Reservation", () => {
    /** Go to the Dashboard */
    cy.get(".NavigationBarButton-DashboardButton").as('dashbtn').should("exist");
    cy.get("@dashbtn").click();

    /** Click on the reservation */
    cy.contains(todayDateReformat + " - " + newDateReformat).eq(0).should("exist").click();

    /** Click the Cancel button */
    cy.contains("Cancel").should("be.visible").click();
    cy.wait(1000);

    /** Confirm that the reservation was cancelled :D */
    cy.contains(todayDateReformat + " - " + newDateReformat).should("not.exist");
  });

  it("Failed Create Reservation with Invalid Start Date", () => {
    /** Input the dates */
    cy.get("input[name='startDate'").eq(1).clear().type("1/18/2020");
    cy.get("input[name='endDate'").eq(1).clear().type(newDate);

    /** Click Reserve button */
    cy.contains("Reserve").click({force: true});
    cy.wait(1000);

    /** Checkboxes should not appear */
    cy.get("button[class='IconButton-Container AvailableModelCard-SelectButton']").should("not.exist");

    /** The next button should not appear */
    cy.get(".ReservationsPage-ContinueButton").should("not.exist");
  });

  it("Failed Create Reservation with Invalid End Date", () => {
    /** Input the dates */
    cy.get("input[name='startDate'").eq(1).clear().type(todayDate);
    cy.get("input[name='endDate'").eq(1).clear().type("1/18/2020");

    /** Click Reserve button */
    cy.contains("Reserve").click({force: true});
    cy.wait(1000);

    /** Checkboxes should not appear */
    cy.get("button[class='IconButton-Container AvailableModelCard-SelectButton']").should("not.exist");

    /** The next button should not appear */
    cy.get(".ReservationsPage-ContinueButton").should("not.exist");
  });
});

/**
 * Admin Inventory Tests
 * Tests various functionalities of the admin's inventory system
 * Contains first success then error test cases
 * Success: sign up with temp@spu.edu, first, last, 900736428, and wakemeupwhenyougogo
 * Fail: invalid email, school ID, and password; missing names; and existing account (email and school ID)
 */
describe("Admin Inventory Page", () => {
    beforeEach(() => {
        cy.visit(home);
    
        /** Verify if the input field for school email */
        cy.get("input[name='emailAddress'").should("exist").type(prod_admin_email);
    
        /** Verify if "Continue" button */
        cy.contains("Continue").should("exist").click();
    
        /** Verify if the input field for password */
        cy.get("input[name='password'").should("exist").type(prod_admin_password);
    
        /** Verify if "Sign In" button exists */
        cy.contains("Sign In").should("exist").click();
        cy.wait(2000);
    
        /** Verify if user is navigated to Dashboard */
        cy.url().should("include", "/Dashboard");
    
        /** Verify Inventory Navigation */
        cy.get(".NavigationBarButton-InventoryButton").as('invenbtn').should("exist");
        cy.get("@invenbtn").click();
        cy.url().should("include", "/Inventory");
      });

      it("Successful Add Type", () => {
        /** Click on Type tab */
        cy.contains("Type").should("exist").click();

        /** Click on "Add Type" button */
        cy.contains("Add Type").should("exist").click();

        /** Type in type name "a bad game" */
        cy.get("input[name='name']").should("exist").type("a bad game");

        /** Click on "Add Type" button again */
        cy.contains("Add Type").should("exist").click();
        cy.wait(5000);

        /** Return to Inventory page */
        cy.get(".NavigationBarButton-InventoryButton").as('invenbtn').should("exist");
        cy.get("@invenbtn").click();
        cy.url().should("include", "/Inventory");

        /** Click on Type tab */
        cy.contains("Type").should("exist").click();

        /** Check if Type "a bad game" exists */
        cy.contains("a bad game").should("exist");
      });

      it("Successful Edit Type", () => {
        /** Click on Type tab */
        cy.contains("Type").should("exist").click();

        /** Click on checkbox next to "a bad game" (should be 1st one) */
        cy.get("button[class='IconButton-Container TypeInventoryCard-SelectButton']").eq(0).should("exist").click();

        /** Click on "Edit" button */
        cy.contains("Edit").should("exist").click();
        cy.wait(2000);

        /** Change type name to "a blastingly fun game" */
        cy.get("input[name='name']").should("exist").clear().type("a blastingly fun game");

        /** Click on the "Save button" */
        cy.contains("Save").should("exist").click();

        /** Click on the back button */
        cy.get("button[class='IconButton-Container UpdateTypePage-BackButton']").should("exist").click();
        cy.wait(2000);

        /** Check if Type "a blastingly fun game" exists */
        cy.contains("a blastingly fun game").should("exist");
      });

      it("Successful Delete Type", () => {
        /** Click on Type tab */
        cy.contains("Type").should("exist").click();

        /** Click on checkbox next to "a blastingly fun game" (the 1st one) */
        cy.get("button[class='IconButton-Container TypeInventoryCard-SelectButton']").eq(0).should("exist").click();

        /** Click on the trash can button */
        cy.get("button[class='InventoryPage-DeleteButton StandardButton-Container']").should("exist").click();

        /** Click the "Yes" button on the pop-up */
        cy.contains("Yes").should("exist").click();

        /** Type "a blastingly fun game" should not exist */
        cy.contains("a blastingly fun game").should("not.exist");
      });
      
      it("Successful Add Model", () => {
        /** Ensure type 'Accelerometer' exists */
        cy.contains("Type").should("exist").click();
        cy.contains("Accelerometer").should("exist");

        /** Test: */
        /** Click on Model tab */
        cy.contains("Model").should("exist").click();

        /** Click on "Add Model" button */
        cy.contains("Add Model").should("exist").click();

        /** Type in dummy model name "AA-NINTENDO-SWITCH" */
        cy.get("input[name='name']").should("exist").type("AA-NINTENDO-SWITCH");

        /** Select type "Accelerometer" */
        cy.contains("Select type").should("exist").click();
        cy.contains("Accelerometer").should("exist").click();

        /** Upload example image */
        cy.get("input[type=file]").should("exist").selectFile("files/nintendo-switch.jpg", {force:true});

        /** Click on "Add Model" button again */
        cy.contains("Add Model").should("exist").click();
        cy.wait(6000); //wait for the app to finish processing

        /** Return to Inventory page */
        cy.get(".NavigationBarButton-InventoryButton").as('invenbtn').should("exist");
        cy.get("@invenbtn").click();
        cy.url().should("include", "/Inventory");

        /** Click on Model tab */
        cy.contains("Model").should("exist").click();
        cy.wait(1000);

        /** Check if Model "NINTENDO-SWITCH" exists */
        cy.contains("AA-NINTENDO-SWITCH").should("exist");
      });

      it("Successful Edit Model", () => {
        /** Ensure type 'Zoommeter' exists */
        cy.contains("Type").should("exist").click();
        cy.contains("Zoommeter").should("exist");

        /** Click on Model tab */
        cy.contains("Model").should("exist").click();

        /** Click on checkbox next to "AA-NINTENDO-SWITCH" (should be 1st one) */
        cy.get("button[class='IconButton-Container ModelInventoryCard-SelectButton']").eq(0).should("exist").click();

        /** Click on "Edit" button */
        cy.contains("Edit").should("exist").click();
        cy.wait(3500); //wait for the app to finish processing

        /** Change model name to "WII-NINTENDO" */
        cy.get("input[name='name']").should("exist").clear().type('WII-NINTENDO');
        cy.wait(1000);

        /** Change model type to Zoommeter */
        cy.contains("Accelerometer").should("exist").click();
        cy.contains("Zoommeter").should("exist").click();

        /** Change uploaded image */
        cy.get("input[type=file]").should("exist").selectFile("files/wii.png", {force:true});

        /** Click on the "Save button" */
        cy.contains("Save").should("exist").click();
        cy.wait(9000); //wait for the app to finish processing

        /** Click on the back button */
        cy.get("button[class='IconButton-Container UpdateModelPage-BackButton']").should("exist").click();

        /** Check if Model "WII-NINTENDO" exists */
        cy.contains("WII-NINTENDO").should("exist");
      });

      it("Successful Delete Model", () => {
        /** Click on Model tab */
        cy.contains("Model").should("exist").click();

        /** Click on checkbox next to "WII-NINTENDO" (should be last one) */
        cy.get("button[class='IconButton-Container ModelInventoryCard-SelectButton']").last().should("exist").click();

        /** Click on the trash can button */
        cy.get("button[class='InventoryPage-DeleteButton StandardButton-Container']").should("exist").click();

        /** Click the "Yes" button on the pop-up */
        cy.contains("Yes").should("exist").click();

        /** Model "WII-NINTENDO" should not exist */
        cy.contains("WII-NINTENDO").should("not.exist");
      });

      it("Successful Add RFID Antenna", () => {
        /** Click on RFID Antenna tab */
        cy.contains("RFID Antenna").should("exist").click();

        /** Click on "Add Antenna" button */
        cy.contains("Add Antenna").should("exist").click();

        /** Type in dummy antenna ID "wii u" */
        cy.get("input[name='id']").should("exist").type("wii u");

        /** Select location OMH 228 */
        cy.contains("Select location").should("exist").click();
        cy.contains("OMH 228").should("exist").click();

        /** Click on "Add Antenna" button again */
        cy.contains("Add Antenna").should("exist").click();
        cy.wait(2000);

        /** Return to Inventory page */
        cy.get(".NavigationBarButton-InventoryButton").as('invenbtn').should("exist");
        cy.get("@invenbtn").click();
        cy.url().should("include", "/Inventory");

        /** Click on RFID Antenna tab */
        cy.contains("RFID Antenna").should("exist").click();

        /** Check if Antenna "wii u" exists */
        cy.contains("wii u").should("exist");
      });

      it("Successful Edit RFID Antenna", () => {
        /** Click on RFID Antenna tab */
        cy.contains("RFID Antenna").should("exist").click();

        /** Click on checkbox next to "wii u" (should be the last one) */
        cy.get("button[class='IconButton-Container RFIDAntennaInventoryCard-SelectButton']").last().should("exist").click();

        /** Click on "Edit" button */
        cy.contains("Edit").should("exist").click();
        cy.wait(1000);

        /** Change antenna name to "3ds" */
        cy.get("input[name='id']").should("exist").clear().type("3ds");

        /** Add location OMH 225 */
        cy.contains("OMH 228").should("exist").click();
        cy.contains("OMH 225").should("exist").click();

        /** Click on the "Save button" */
        cy.contains("Save").should("exist").click();

        /** Click on the back button */
        cy.get("button[class='IconButton-Container UpdateRFIDAntennaPage-BackButton']").should("exist").click();

        /** Check if Antenna "3ds" exists */
        cy.contains("3ds").should("exist");
      });

      it("Successful Delete RFID Antenna", () => {
        cy.wait(1000); //for loading time

        /** Click on RFID Antenna tab */
        cy.contains("RFID Antenna").should("exist").click();

        /** Click on checkbox next to "3ds" (should be the last one) */
        cy.get("button[class='IconButton-Container RFIDAntennaInventoryCard-SelectButton']").last().should("exist").click();

        /** Click on the trash can button */
        cy.get("button[class='InventoryPage-DeleteButton StandardButton-Container']").should("exist").click();

        /** Click the "Yes" button on the pop-up */
        cy.contains("Yes").should("exist").click();

        /** Antenna "3ds" should not exist */
        cy.contains("3ds").should("not.exist");
      });

      it("Successful Add Location", () => {
        /** Click on Location tab */
        cy.contains("Location").should("exist").click();

        /** Click on "Add Location" button */
        cy.contains("Add Location").should("exist").click();

        /** Type in dummy Location name "Japan" */
        cy.get("input[name='name']").should("exist").type("Japan");

        /** Click on "Add Location" button again */
        cy.contains("Add Location").should("exist").click();
        cy.wait(1000);

        /** Return to Inventory page */
        cy.get(".NavigationBarButton-InventoryButton").as('invenbtn').should("exist");
        cy.get("@invenbtn").click();
        cy.url().should("include", "/Inventory");

        /** Click on Location tab */
        cy.contains("Location").should("exist").click();

        /** Check if Location "Japan" exists */
        cy.contains("Japan").should("exist");
      });

      it("Successful Edit Location", () => {
        /** Click on Location tab */
        cy.contains("Location").should("exist").click();

        /** Find location w/ name "Japan" & click on it */
        cy.contains("Japan").should("exist").click();

        /** Click on "Edit" button */
        cy.contains("Edit").should("exist").click();
        cy.wait(1000);

        /** Change location name to "America" */
        cy.get("input[name='name']").should("exist").clear().type("America");

        /** Click on the "Save button" */
        cy.contains("Save").should("exist").click();

        /** Click on the 1st back button */
        cy.get("button[class='IconButton-Container UpdateLocationPage-BackButton']").should("exist").click();

        /** Click on the 2nd back button */
        cy.get("button[class='IconButton-Container LocationDetailsPage-BackButton']").should("exist").click();

        /** Check if Location "America" exists */
        cy.contains("America").should("exist");
      });

      it("Successful Delete Location", () => {
        /** Click on Location tab */
        cy.contains("Location").should("exist").click();

        /** Testing w/ checkbox 'cause cannot make the other work (hidden elements are frustrating D:< ) */
        /** Click on checkbox next to "America" (should be the last one) */
        cy.get("button[class='IconButton-Container LocationInventoryCard-SelectButton']").last().should("exist").click();

        /** Click on the trash can button */
        cy.get("button[class='InventoryPage-DeleteButton StandardButton-Container']").should("exist").click();

        /** Click the "Yes" button on the pop-up */
        cy.contains("Yes").should("exist").click();

        /** Location "America" should not exist */
        cy.contains("America").should("not.exist");
      });

      it("Successful Add Equipment", () => {
        /** Doesn't check for RFID tag, since it's unclear how the  */
        /** 1st check if type Accelerometer & model FLX DGGO-216 & location OMH 225 exists */
        cy.contains("Type").should("exist").click();
        cy.contains("Accelerometer").should("exist");
        cy.contains("Model").should("exist").click();
        cy.contains("FLX DGGO-216").should("exist");
        cy.contains("Location").should("exist").click();
        cy.contains("OMH 225").should("exist");

        /** Click on the Equipment tab */
        cy.contains("Equipment").should("exist").click();

        /** Click on "Add Equippment" button */
        cy.contains("Add Equipment").as('addbtn').should("exist");
        cy.get('@addbtn').click();
        cy.wait(1000);

        /** Type in dummy serial number AL-O51D00R2ALL3N8E */
        cy.get("input[name='serialNumber']").should("exist").type("AL-O51D00R2ALL3N8E");

        /** Select the type Accelerometer */
        cy.contains("Select type").should("exist").click();
        cy.contains("Accelerometer").should("exist").click();

        /** Select the model FLX DGGO-216 */
        cy.contains("Select model").should("exist").click();
        cy.contains("FLX DGGO-216").should("exist").click();

        /** Select maintenance status ("Ready") */
        cy.contains("Select maintenance status").should("exist").click();
        cy.contains("Ready").should("exist").click();

        /** Select home location (OMH 225) */
        cy.contains("Select home location").should("exist").click();
        cy.contains("OMH 225").should("exist").click();

        /** Select condition ("New") */
        cy.contains("Select condition").should("exist").click();
        cy.contains("New").should("exist").click();
        
        /** Type in purchase cost ($7.83) */
        cy.get("input[name='purchaseCost']").should("exist").type("7.83");

        /** Type in purchase date (9/3/2021) */
        cy.get("input[name='purchaseDate']").should("exist").type("9/3/2021");

        /** Click on 2nd "Add Equippment" button */
        cy.contains("Add Equipment").should("exist").click();
        cy.wait(3000);

        /** Go back to Inventory page */
        cy.get(".NavigationBarButton-InventoryButton").as('invenbtn').should("exist");
        cy.get("@invenbtn").click();
        cy.url().should("include", "/Inventory");

        /** Find added equipment w/ serial ID AL-O51D00R2ALL3N8E & click on it */
        cy.contains("AL-O51D00R2ALL3N8E").should("exist").click();

        /** Check that rest of info is correct */
        cy.contains("Accelerometer").should("exist");
        cy.contains("FLX DGGO-216").should("exist");
        cy.contains("Maintenance: Ready").should("exist");
        cy.contains("Reservation: Available").should("exist");
        cy.contains("Condition: New").should("exist");
        cy.contains("Cost: $7.83").should("exist");
        cy.contains("Purchase Date: 09/03/2021").should("exist");
        cy.contains("Home Room: OMH 225").should("exist");
      });

      it("Successful Edit Equipment", () => {
        /** Check if model NIN UWII-8359 & location OMH 228 exists */
        cy.contains("Model").should("exist").click();
        cy.contains("NIN UWII-8359").should("exist");
        cy.contains("Location").should("exist").click();
        cy.contains("OMH 228").should("exist");

        /** Click on the Equipment tab */
        cy.contains("Equipment").should("exist").click();

        /** Find equipment w/ serial ID AL-O51D00R2ALL3N8E & click on it */
        cy.contains("AL-O51D00R2ALL3N8E").should("exist").click();

        /** Click on "Edit" button */
        cy.contains("Edit").should("exist").click();
        cy.wait(2000);

        /** Change model to NIN UWII-8359 */
        cy.contains("FLX DGGO-216").should("exist").click();
        cy.contains("NIN UWII-8359").should("exist").click();

        /** Change status to "Under Repair" */
        cy.contains("Ready").should("exist").click();
        cy.contains("Under Repair").should("exist").click();

        /** Add OMH 228 to home location */
        cy.contains("OMH 225").should("exist").click();
        cy.contains("OMH 228").should("exist").click();

        /** Change condition to "Used" */
        cy.contains("New").should("exist").click();
        cy.contains("Used").should("exist").click();

        /** Change purchase date to 12/17/2020 */
        cy.get("input[name='purchaseDate']").should("exist").clear().type("12/17/2020");

        /** Click on the "Save button" */
        cy.contains("Save").should("exist").click();
        cy.wait(3000);

        /** Click on the back button */
        cy.get("button[class='IconButton-Container UpdateEquipmentPage-BackButton']").should("exist").click();

        /** Check that most info's been changed on details page */
        cy.contains("Accelerometer").should("exist");
        cy.contains("FLX DGGO-216").should("not.exist");
        cy.contains("NIN UWII-8359").should("exist");
        cy.contains("Maintenance: Under Repair").should("exist");
        cy.contains("Reservation: Available").should("exist");
        cy.contains("Condition: Used").should("exist");
        cy.contains("Cost: $7.83").should("exist");
        cy.contains("Purchase Date: 12/17/2020").should("exist");
        // cy.contains("RFID Tag: TBD").should("exist");
        cy.contains("Home Room: OMH 225, OMH 228").should("exist");
      });

      it("Successful Delete Equipment", () => {
        /** Testing w/ checkbox 'cause cannot make the other work (hidden elements are frustrating D:< ) */
        /** Click on checkbox next to equipment w/ serial ID AL-O51D00R2ALL3N8E (should be the first one) */
        cy.get("button[class='IconButton-Container EquipmentInventoryCard-SelectButton']").first().should("exist").click();

        /** Click on the trash can button */
        cy.get("button[class='InventoryPage-DeleteButton StandardButton-Container']").should("exist").click();

        /** Click the "Yes" button on the pop-up */
        cy.contains("Yes").should("exist").click();

        /** Equipment w/ serial ID AL-O51D00R2ALL3N8E should not exist */
        cy.contains("AL-O51D00R2ALL3N8E").should("not.exist");
      });

      it("Failed Add/Edit Type Missing Name", () => {
        /** Click on Type tab */
        cy.contains("Type").should("exist").click();

        /** Click on "Add Type" button */
        cy.contains("Add Type").should("exist").click();

        /** Click on "Add Type" button again */
        cy.contains("Add Type").as('submit').should("exist");
        cy.get('@submit').click();
        cy.wait(5000);

        /** Error message should appear */
        cy.contains("Please enter the type name.").should("exist");
      });

      it("Failed Add/Edit Model Missing Name", () => {
        /** Ensure type 'Accelerometer' exists */
        cy.contains("Type").should("exist").click();
        cy.contains("Accelerometer").should("exist");

        /** Test: */
        /** Click on Model tab */
        cy.contains("Model").should("exist").click();

        /** Click on "Add Model" button */
        cy.contains("Add Model").should("exist").click();

        /** Select type "Accelerometer" */
        cy.contains("Select type").should("exist").click();
        cy.contains("Accelerometer").should("exist").click();

        /** Upload example image */
        cy.get("input[type=file]").should("exist").selectFile("files/nintendo-switch.jpg", {force:true});

        /** Click on "Add Model" button again */
        cy.contains("Add Model").should("exist").click();

        /** Error message should appear */
        cy.contains("Please enter the model name.").should("exist");
      });

      it("Failed Add/Edit Model Missing Type", () => {
        /** Ensure type 'Accelerometer' exists */
        cy.contains("Type").should("exist").click();
        cy.contains("Accelerometer").should("exist");

        /** Test: */
        /** Click on Model tab */
        cy.contains("Model").should("exist").click();

        /** Click on "Add Model" button */
        cy.contains("Add Model").should("exist").click();

        /** Type in dummy model name "AA-NINTENDO-SWITCH" */
        cy.get("input[name='name']").should("exist").type("AA-NINTENDO-SWITCH");

        /** Upload example image */
        cy.get("input[type=file]").should("exist").selectFile("files/nintendo-switch.jpg", {force:true});

        /** Click on "Add Model" button again */
        cy.contains("Add Model").should("exist").click();

        /** Error message should appear */
        cy.contains("Please select the model type.").should("exist");
      });

      it("Failed Add/Edit Model Missing Photo", () => {
        /** Ensure type 'Accelerometer' exists */
        cy.contains("Type").should("exist").click();
        cy.contains("Accelerometer").should("exist");

        /** Test: */
        /** Click on Model tab */
        cy.contains("Model").should("exist").click();

        /** Click on "Add Model" button */
        cy.contains("Add Model").should("exist").click();

        /** Type in dummy model name "AA-NINTENDO-SWITCH" */
        cy.get("input[name='name']").should("exist").type("AA-NINTENDO-SWITCH");

        /** Select type "Accelerometer" */
        cy.contains("Select type").should("exist").click();
        cy.contains("Accelerometer").should("exist").click();

        /** Click on "Add Model" button again */
        cy.contains("Add Model").should("exist").click();

        /** Error message should appear */
        cy.contains("Please upload the model photo.").should("exist");
      });

      it("Failed Add/Edit RFID Antenna Missing ID", () => {
        /** Click on RFID Antenna tab */
        cy.contains("RFID Antenna").should("exist").click();

        /** Click on "Add Antenna" button */
        cy.contains("Add Antenna").should("exist").click();

        /** Select location OMH 228 */
        cy.contains("Select location").should("exist").click();
        cy.contains("OMH 228").should("exist").click();

        /** Click on "Add Antenna" button again */
        cy.contains("Add Antenna").should("exist").click();

        /** Error message should appear */
        cy.contains("Please enter the RFID antenna ID.").should("exist");
      });

      it("Failed Add/Edit Location Missing Name", () => {
        /** Click on Location tab */
        cy.contains("Location").should("exist").click();

        /** Click on "Add Location" button */
        cy.contains("Add Location").should("exist").click();

        /** Click on "Add Location" button again */
        cy.contains("Add Location").as('submit').should("exist");
        cy.get('@submit').click();

        /** Error message should appear */
        cy.contains("Please enter the location name.").should("exist");
      });

      it("Failed Add Equipment Missing Serial Number", () => {
        /** 1st check if type Accelerometer & model FLX DGGO-216 & location OMH 225 exists */
        cy.contains("Type").should("exist").click();
        cy.contains("Accelerometer").should("exist");
        cy.contains("Model").should("exist").click();
        cy.contains("FLX DGGO-216").should("exist");
        cy.contains("Location").should("exist").click();
        cy.contains("OMH 225").should("exist");

        /** Click on the Equipment tab */
        cy.contains("Equipment").should("exist").click();

        /** Click on "Add Equippment" button */
        cy.contains("Add Equipment").as('addbtn').should("exist");
        cy.get('@addbtn').click();
        cy.wait(1000);

        /** Select the type Accelerometer */
        cy.contains("Select type").should("exist").click();
        cy.contains("Accelerometer").should("exist").click();

        /** Select the model FLX DGGO-216 */
        cy.contains("Select model").should("exist").click();
        cy.contains("FLX DGGO-216").should("exist").click();

        /** Select maintenance status ("Ready") */
        cy.contains("Select maintenance status").should("exist").click();
        cy.contains("Ready").should("exist").click();

        /** Select home location (OMH 225) */
        cy.contains("Select home location").should("exist").click();
        cy.contains("OMH 225").should("exist").click();

        /** Select condition ("New") */
        cy.contains("Select condition").should("exist").click();
        cy.contains("New").should("exist").click();
        
        /** Type in purchase cost ($7.83) */
        cy.get("input[name='purchaseCost']").should("exist").type("7.83");

        /** Type in purchase date (9/3/2021) */
        cy.get("input[name='purchaseDate']").should("exist").type("9/3/2021");

        /** Click on 2nd "Add Equippment" button */
        cy.contains("Add Equipment").should("exist").click();

        /** Error message should appear */
        cy.contains("Please enter the equipment serial number.").should("exist");
      });

      it("Failed Add Equipment Missing Type", () => {
        /** 1st check if type Accelerometer & model FLX DGGO-216 & location OMH 225 exists */
        cy.contains("Type").should("exist").click();
        cy.contains("Accelerometer").should("exist");
        cy.contains("Model").should("exist").click();
        cy.contains("FLX DGGO-216").should("exist");
        cy.contains("Location").should("exist").click();
        cy.contains("OMH 225").should("exist");

        /** Click on the Equipment tab */
        cy.contains("Equipment").should("exist").click();

        /** Click on "Add Equippment" button */
        cy.contains("Add Equipment").as('addbtn').should("exist");
        cy.get('@addbtn').click();
        cy.wait(1000);

        /** Type in dummy serial number AL-O51D00R2ALL3N8E */
        cy.get("input[name='serialNumber']").should("exist").type("AL-O51D00R2ALL3N8E");

        /** Select maintenance status ("Ready") */
        cy.contains("Select maintenance status").should("exist").click();
        cy.contains("Ready").should("exist").click();

        /** Select home location (OMH 225) */
        cy.contains("Select home location").should("exist").click();
        cy.contains("OMH 225").should("exist").click();

        /** Select condition ("New") */
        cy.contains("Select condition").should("exist").click();
        cy.contains("New").should("exist").click();
        
        /** Type in purchase cost ($7.83) */
        cy.get("input[name='purchaseCost']").should("exist").type("7.83");

        /** Type in purchase date (9/3/2021) */
        cy.get("input[name='purchaseDate']").should("exist").type("9/3/2021");

        /** Click on 2nd "Add Equippment" button */
        cy.contains("Add Equipment").should("exist").click();

        /** Error message should appear */
        cy.contains("Please enter the equipment type.").should("exist");
      });

      it("Failed Add Equipment Missing Model", () => {
        /** 1st check if type Accelerometer & model FLX DGGO-216 & location OMH 225 exists */
        cy.contains("Type").should("exist").click();
        cy.contains("Accelerometer").should("exist");
        cy.contains("Model").should("exist").click();
        cy.contains("FLX DGGO-216").should("exist");
        cy.contains("Location").should("exist").click();
        cy.contains("OMH 225").should("exist");

        /** Click on the Equipment tab */
        cy.contains("Equipment").should("exist").click();

        /** Click on "Add Equippment" button */
        cy.contains("Add Equipment").as('addbtn').should("exist");
        cy.get('@addbtn').click();
        cy.wait(1000);

        /** Type in dummy serial number AL-O51D00R2ALL3N8E */
        cy.get("input[name='serialNumber']").should("exist").type("AL-O51D00R2ALL3N8E");

        /** Select the type Accelerometer */
        cy.contains("Select type").should("exist").click();
        cy.contains("Accelerometer").should("exist").click();

        /** Select maintenance status ("Ready") */
        cy.contains("Select maintenance status").should("exist").click();
        cy.contains("Ready").should("exist").click();

        /** Select home location (OMH 225) */
        cy.contains("Select home location").should("exist").click();
        cy.contains("OMH 225").should("exist").click();

        /** Select condition ("New") */
        cy.contains("Select condition").should("exist").click();
        cy.contains("New").should("exist").click();
        
        /** Type in purchase cost ($7.83) */
        cy.get("input[name='purchaseCost']").should("exist").type("7.83");

        /** Type in purchase date (9/3/2021) */
        cy.get("input[name='purchaseDate']").should("exist").type("9/3/2021");

        /** Click on 2nd "Add Equippment" button */
        cy.contains("Add Equipment").should("exist").click();

        /** Error message should appear */
        cy.contains("Please enter the equipment model.").should("exist");
      });

      it("Failed Add Equipment Missing Maintenance Status", () => {
        /** 1st check if type Accelerometer & model FLX DGGO-216 & location OMH 225 exists */
        cy.contains("Type").should("exist").click();
        cy.contains("Accelerometer").should("exist");
        cy.contains("Model").should("exist").click();
        cy.contains("FLX DGGO-216").should("exist");
        cy.contains("Location").should("exist").click();
        cy.contains("OMH 225").should("exist");

        /** Click on the Equipment tab */
        cy.contains("Equipment").should("exist").click();

        /** Click on "Add Equippment" button */
        cy.contains("Add Equipment").as('addbtn').should("exist");
        cy.get('@addbtn').click();
        cy.wait(1000);

        /** Type in dummy serial number AL-O51D00R2ALL3N8E */
        cy.get("input[name='serialNumber']").should("exist").type("AL-O51D00R2ALL3N8E");

        /** Select the type Accelerometer */
        cy.contains("Select type").should("exist").click();
        cy.contains("Accelerometer").should("exist").click();

        /** Select the model FLX DGGO-216 */
        cy.contains("Select model").should("exist").click();
        cy.contains("FLX DGGO-216").should("exist").click();
      
        /** Select home location (OMH 225) */
        cy.contains("Select home location").should("exist").click();
        cy.contains("OMH 225").should("exist").click();

        /** Select condition ("New") */
        cy.contains("Select condition").should("exist").click();
        cy.contains("New").should("exist").click();
        
        /** Type in purchase cost ($7.83) */
        cy.get("input[name='purchaseCost']").should("exist").type("7.83");

        /** Type in purchase date (9/3/2021) */
        cy.get("input[name='purchaseDate']").should("exist").type("9/3/2021");

        /** Click on 2nd "Add Equippment" button */
        cy.contains("Add Equipment").should("exist").click();

        /** Error message should appear */
        cy.contains("Please select the maintenance status.").should("exist");
      });

      it("Failed Add Equipment Missing Condition", () => {
        /** 1st check if type Accelerometer & model FLX DGGO-216 & location OMH 225 exists */
        cy.contains("Type").should("exist").click();
        cy.contains("Accelerometer").should("exist");
        cy.contains("Model").should("exist").click();
        cy.contains("FLX DGGO-216").should("exist");
        cy.contains("Location").should("exist").click();
        cy.contains("OMH 225").should("exist");

        /** Click on the Equipment tab */
        cy.contains("Equipment").should("exist").click();

        /** Click on "Add Equippment" button */
        cy.contains("Add Equipment").as('addbtn').should("exist");
        cy.get('@addbtn').click();
        cy.wait(1000);

        /** Type in dummy serial number AL-O51D00R2ALL3N8E */
        cy.get("input[name='serialNumber']").should("exist").type("AL-O51D00R2ALL3N8E");

        /** Select the type Accelerometer */
        cy.contains("Select type").should("exist").click();
        cy.contains("Accelerometer").should("exist").click();

        /** Select the model FLX DGGO-216 */
        cy.contains("Select model").should("exist").click();
        cy.contains("FLX DGGO-216").should("exist").click();

        /** Select maintenance status ("Ready") */
        cy.contains("Select maintenance status").should("exist").click();
        cy.contains("Ready").should("exist").click();

        /** Select home location (OMH 225) */
        cy.contains("Select home location").should("exist").click();
        cy.contains("OMH 225").should("exist").click();
        
        /** Type in purchase cost ($7.83) */
        cy.get("input[name='purchaseCost']").should("exist").type("7.83");

        /** Type in purchase date (9/3/2021) */
        cy.get("input[name='purchaseDate']").should("exist").type("9/3/2021");

        /** Click on 2nd "Add Equippment" button */
        cy.contains("Add Equipment").should("exist").click();

        /** Error message should appear */
        cy.contains("Please select the equipment condition.").should("exist");
      });

      it("Failed Add Equipment Existing Serial ID", () => {
        /** 1st check if type Accelerometer & model FLX DGGO-216 & location OMH 225 exists */
        cy.contains("Type").should("exist").click();
        cy.contains("Accelerometer").should("exist");
        cy.contains("Model").should("exist").click();
        cy.contains("FLX DGGO-216").should("exist");
        cy.contains("Location").should("exist").click();
        cy.contains("OMH 225").should("exist");

        /** Click on the Equipment tab */
        cy.contains("Equipment").should("exist").click();

        /** Click on "Add Equippment" button */
        cy.contains("Add Equipment").as('addbtn').should("exist");
        cy.get('@addbtn').click();
        cy.wait(1000);

        /** Type in dummy serial number WII-MOTIONEPLAY3990 */
        cy.get("input[name='serialNumber']").should("exist").type("WII-MOTIONEPLAY3990");

        /** Select the type Accelerometer */
        cy.contains("Select type").should("exist").click();
        cy.contains("Accelerometer").should("exist").click();

        /** Select the model FLX DGGO-216 */
        cy.contains("Select model").should("exist").click();
        cy.contains("FLX DGGO-216").should("exist").click();

        /** Select maintenance status ("Ready") */
        cy.contains("Select maintenance status").should("exist").click();
        cy.contains("Ready").should("exist").click();

        /** Select home location (OMH 225) */
        cy.contains("Select home location").should("exist").click();
        cy.contains("OMH 225").should("exist").click();

        /** Select condition ("New") */
        cy.contains("Select condition").should("exist").click();
        cy.contains("New").should("exist").click();
        
        /** Type in purchase cost ($7.83) */
        cy.get("input[name='purchaseCost']").should("exist").type("7.83");

        /** Type in purchase date (9/3/2021) */
        cy.get("input[name='purchaseDate']").should("exist").type("9/3/2021");

        /** Click on 2nd "Add Equippment" button */
        cy.contains("Add Equipment").should("exist").click();

        /** Error message should appear */
        cy.contains("The Serial ID already exists. Serial ID must be unique.").should("exist");
      });

      it("Failed? Add Equipment with Incorrect Price Format", () => {
        /** 1st check if type Accelerometer & model FLX DGGO-216 & location OMH 225 exists */
        cy.contains("Type").should("exist").click();
        cy.contains("Accelerometer").should("exist");
        cy.contains("Model").should("exist").click();
        cy.contains("FLX DGGO-216").should("exist");
        cy.contains("Location").should("exist").click();
        cy.contains("OMH 225").should("exist");

        /** Click on the Equipment tab */
        cy.contains("Equipment").should("exist").click();

        /** Click on "Add Equippment" button */
        cy.contains("Add Equipment").as('addbtn').should("exist");
        cy.get('@addbtn').click();
        cy.wait(1000);

        /** Type in dummy serial number AL-O51D00R2ALL3N8E */
        cy.get("input[name='serialNumber']").should("exist").type("AL-O51D00R2ALL3N8E");

        /** Select the type Accelerometer */
        cy.contains("Select type").should("exist").click();
        cy.contains("Accelerometer").should("exist").click();

        /** Select the model FLX DGGO-216 */
        cy.contains("Select model").should("exist").click();
        cy.contains("FLX DGGO-216").should("exist").click();

        /** Select maintenance status ("Ready") */
        cy.contains("Select maintenance status").should("exist").click();
        cy.contains("Ready").should("exist").click();

        /** Select home location (OMH 225) */
        cy.contains("Select home location").should("exist").click();
        cy.contains("OMH 225").should("exist").click();

        /** Select condition ("New") */
        cy.contains("Select condition").should("exist").click();
        cy.contains("New").should("exist").click();
        
        /** Type in purchase cost (E) */
        cy.get("input[name='purchaseCost']").should("exist").type("E");

        /** Type in purchase date (9/3/2021) */
        cy.get("input[name='purchaseDate']").should("exist").type("9/3/2021");

        /** Click on 2nd "Add Equippment" button */
        cy.contains("Add Equipment").should("exist").click();
        cy.wait(3000);

        /** Go back to Inventory page */
        cy.get(".NavigationBarButton-InventoryButton").as('invenbtn').should("exist");
        cy.get("@invenbtn").click();
        cy.url().should("include", "/Inventory");

        /** Find added equipment w/ serial ID AL-O51D00R2ALL3N8E & click on it */
        cy.contains("AL-O51D00R2ALL3N8E").should("exist").click();

        /** Check that rest of info is correct */
        cy.contains("Accelerometer").should("exist");
        cy.contains("FLX DGGO-216").should("exist");
        cy.contains("Maintenance: Ready").should("exist");
        cy.contains("Reservation: Available").should("exist");
        cy.contains("Condition: New").should("exist");
        cy.contains("Cost: $--.--").should("exist");
        cy.contains("Purchase Date: 09/03/2021").should("exist");
        cy.contains("Home Room: OMH 225").should("exist");

        /** Go back and delete it */
        cy.get("button[class='IconButton-Container EquipmentDetailsPage-BackButton']").should("exist").click();
        cy.get("button[class='IconButton-Container EquipmentInventoryCard-SelectButton']").first().should("exist").click();
        cy.get("button[class='InventoryPage-DeleteButton StandardButton-Container']").should("exist").click();
        cy.contains("Yes").should("exist").click();
      });

      it("Failed Add Equipment with Invalid Date", () => {
        /** 1st check if type Accelerometer & model FLX DGGO-216 & location OMH 225 exists */
        cy.contains("Type").should("exist").click();
        cy.contains("Accelerometer").should("exist");
        cy.contains("Model").should("exist").click();
        cy.contains("FLX DGGO-216").should("exist");
        cy.contains("Location").should("exist").click();
        cy.contains("OMH 225").should("exist");

        /** Click on the Equipment tab */
        cy.contains("Equipment").should("exist").click();

        /** Click on "Add Equippment" button */
        cy.contains("Add Equipment").as('addbtn').should("exist");
        cy.get('@addbtn').click();
        cy.wait(1000);

        /** Type in dummy serial number AL-O51D00R2ALL3N8E */
        cy.get("input[name='serialNumber']").should("exist").type("AL-O51D00R2ALL3N8E");

        /** Select the type Accelerometer */
        cy.contains("Select type").should("exist").click();
        cy.contains("Accelerometer").should("exist").click();

        /** Select the model FLX DGGO-216 */
        cy.contains("Select model").should("exist").click();
        cy.contains("FLX DGGO-216").should("exist").click();

        /** Select maintenance status ("Ready") */
        cy.contains("Select maintenance status").should("exist").click();
        cy.contains("Ready").should("exist").click();

        /** Select home location (OMH 225) */
        cy.contains("Select home location").should("exist").click();
        cy.contains("OMH 225").should("exist").click();

        /** Select condition ("New") */
        cy.contains("Select condition").should("exist").click();
        cy.contains("New").should("exist").click();
        
        /** Type in purchase cost ($7.83) */
        cy.get("input[name='purchaseCost']").should("exist").type("7.83");

        /** Type in purchase date (9/3/2029) */
        cy.get("input[name='purchaseDate']").should("exist").type("9/3/2029");

        /** Click on 2nd "Add Equippment" button */
        cy.contains("Add Equipment").should("exist").click();
        cy.wait(1000);

        /** Error message should appear */
        cy.contains("Invalid purchase date, expected a date before/at today").should("exist");
      });

      it("Failed Add Equipment with Invalid RFID Tag", () => {
        /** 1st check if type Accelerometer & model FLX DGGO-216 & location OMH 225 exists */
        cy.contains("Type").should("exist").click();
        cy.contains("Accelerometer").should("exist");
        cy.contains("Model").should("exist").click();
        cy.contains("FLX DGGO-216").should("exist");
        cy.contains("Location").should("exist").click();
        cy.contains("OMH 225").should("exist");

        /** Click on the Equipment tab */
        cy.contains("Equipment").should("exist").click();

        /** Click on "Add Equippment" button */
        cy.contains("Add Equipment").as('addbtn').should("exist");
        cy.get('@addbtn').click();
        cy.wait(1000);

        /** Type in dummy serial number AL-O51D00R2ALL3N8E */
        cy.get("input[name='serialNumber']").should("exist").type("AL-O51D00R2ALL3N8E");

        /** Select the type Accelerometer */
        cy.contains("Select type").should("exist").click();
        cy.contains("Accelerometer").should("exist").click();

        /** Select the model FLX DGGO-216 */
        cy.contains("Select model").should("exist").click();
        cy.contains("FLX DGGO-216").should("exist").click();

        /** Select maintenance status ("Ready") */
        cy.contains("Select maintenance status").should("exist").click();
        cy.contains("Ready").should("exist").click();

        /** Type in RFID Tag ("i think my wii sports is broken") */
        cy.get("input[name='rfidTag']").should("exist").type("i think my wii sports is broken");

        /** Select home location (OMH 225) */
        cy.contains("Select home location").should("exist").click();
        cy.contains("OMH 225").should("exist").click();

        /** Select condition ("New") */
        cy.contains("Select condition").should("exist").click();
        cy.contains("New").should("exist").click();
        
        /** Type in purchase cost ($7.83) */
        cy.get("input[name='purchaseCost']").should("exist").type("7.83");

        /** Type in purchase date (9/3/2020) */
        cy.get("input[name='purchaseDate']").should("exist").type("9/3/2020");

        /** Click on 2nd "Add Equippment" button */
        cy.contains("Add Equipment").should("exist").click();
        cy.wait(1000);

        /** Error message should appear */
        cy.contains("Invalid Tag ID. Tag ID must be HEX presentation.").should("exist");
      });
});

/**
 * Faculty Dashboard & Nav Tests
 * Checks the basic UI & functionality of faculty/student user's dashboard & navigation bar
 * Success: all needed UI components in admin works as expected
 */
describe("Faculty Main Dashboard & Nav Bar", () => {
  beforeEach(() => {
    cy.visit(home);

    /** Verify if the input field for school email */
    cy.get("input[name='emailAddress']").should("exist").type(prod_faculty_email);

    /** Verify if "Continue" button */
    cy.contains("Continue").should("exist").click();

    /** Verify if the input field for password */
    cy.get("input[name='password'").should("exist").type(prod_faculty_password);

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

    /** Verify Settings Navigation */
    cy.get(".NavigationBarButton-SettingsButton").as('setbtn').should("exist");
    cy.get("@setbtn").click();
    cy.url().should("include", "/Settings");

    /** Verify Sign Out Navigation */
    cy.get(".NavigationBarButton-SignOutButton").as('signoutbtn').should("exist");
    cy.get("@signoutbtn").click();
    cy.url().should("eq", prod_url);
  });
});

/**
 * Faculty Reservation Tests
 * Tests faculty reservation system's UI and functionalities
 * Contains first success then error test cases
 * Success: make and cancel reservations & UI works as expected
 * Fail: tbd
 */
describe("Faculty Reservation Page", () => {
    beforeEach(() => {
      cy.visit(home);
  
      /** Verify if the input field for school email */
      cy.get("input[name='emailAddress']").should("exist").type(prod_faculty_email);
      
      /** Verify if "Continue" button */
      cy.contains("Continue").should("exist").click();
      
      /** Verify if the input field for password */
      cy.get("input[name='password'").should("exist").type(prod_faculty_password);
      
      /** Verify if "Sign In" button exists */
      cy.contains("Sign In").should("exist").click();
  
      /** Verify if user is navigated to Dashboard */
      cy.url().should("include", "/Dashboard");
  
      /** Verify Reservations Navigation */
      cy.get(".NavigationBarButton-ReservationsButton").as('resbtn').should("exist");
      cy.get("@resbtn").click({force: true});
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
      cy.get("button[class='IconButton-Container AvailableModelCard-SelectButton']").eq(0).should("exist").click();
  
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
      cy.get("input[name='startDate'").clear().type("04/11/2023");
      cy.get("input[name='endDate'").clear().type("06/15/2023");
  
      /** Check if reservation list is now empty */
      cy.contains("There are no reservations.").should("exist");
  
      /** Now clear the date input fields */
      cy.get("input[name='startDate'").clear();
      cy.get("input[name='endDate'").clear();
  
      /** Check if "Only Your Reservations" checkbox exist and click it */
      cy.get("button[class='IconButton-Container ReservationsPage-OnlyYourReservationsButton']").should("exist").click();
  
      // /**TODO: Check if reservation list updates to admin-only reservations */
      // cy.get("div[class='ReservationList-Container ReservationsPage-ReservationList']");
  
      // /** Check if Requested filter button exists and click it */
      // cy.contains("Requested").click();
  
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
  
    it("Successful Make Reservation", () => {
      /** Assuming 1st item in reservation inventory list has 3 or more items: */
      /** Input the dates */
      cy.get("input[name='startDate'").eq(1).clear().type(todayDate);
      cy.get("input[name='endDate'").eq(1).clear().type(newDate);
  
      /** Click Reserve button */
      cy.contains("Reserve").click({force: true});
      cy.wait(1000);
  
      /** Click on the 1st checkbox*/
      cy.get("button[class='IconButton-Container AvailableModelCard-SelectButton']").eq(0).should("exist").click();
  
      /** Click on the next button */
      cy.get(".ReservationsPage-ContinueButton").eq(0).should("exist").click();
      
      /** Click on the plus button 2 times */
      cy.get("button[class='IconButton-Container SpecifyModelQuantityCard-QuantityUpdateButton']").eq(0).should("exist").click();
      cy.get("button[class='IconButton-Container SpecifyModelQuantityCard-QuantityUpdateButton']").eq(0).should("exist").click();
  
      /** Click the next button */
      cy.get("button[class='ReservationsPage-ContinueButton StandardButton-Container']").eq(0).should("exist").click();
  
      /** Click the confirm button */
      cy.get("button[class='ReservationsPage-ConfirmButton StandardButton-Container']").eq(0).should("exist").click();
      cy.wait(8000);
  
      /** Go to the Dashboard */
      cy.get(".NavigationBarButton-DashboardButton").as('dashbtn').should("exist");
      cy.get("@dashbtn").click({force:true});
  
      /** Confirm that the reservation has been successfully created and is displayed */
      cy.contains(todayDateReformat).should("exist");
      cy.contains(newDateReformat).should("exist");
      cy.contains("3 items").should("exist");
    });

    it("Successful Cancel Reservation", () => {
        /** Go to the Dashboard */
        cy.get(".NavigationBarButton-DashboardButton").as('dashbtn').should("exist");
        cy.get("@dashbtn").click();
    
        /** Click on the reservation */
        cy.contains(todayDateReformat + " - " + newDateReformat).eq(0).should("exist").click();
    
        /** Click the Cancel button */
        cy.contains("Cancel").should("be.visible").click();
    
        /** Confirm that the reservation was cancelled :D */
        cy.contains(todayDateReformat + " - " + newDateReformat).should("not.exist");
      });
      
    it("Failed Create Reservation with Invalid Start Date", () => {
        /** Input the dates */
        cy.get("input[name='startDate'").eq(1).clear().type("1/18/2020");
        cy.get("input[name='endDate'").eq(1).clear().type(newDate);
    
        /** Click Reserve button */
        cy.contains("Reserve").click({force: true});
        cy.wait(1000);
    
        /** Checkboxes should not appear */
        cy.get("button[class='IconButton-Container AvailableModelCard-SelectButton']").should("not.exist");
    
        /** The next button should not appear */
        cy.get(".ReservationsPage-ContinueButton").should("not.exist");
    });
    
    it("Failed Create Reservation with Invalid End Date", () => {
        /** Input the dates */
        cy.get("input[name='startDate'").eq(1).clear().type(todayDate);
        cy.get("input[name='endDate'").eq(1).clear().type("1/18/2020");
    
        /** Click Reserve button */
        cy.contains("Reserve").click({force: true});
        cy.wait(1000);
    
        /** Checkboxes should not appear */
        cy.get("button[class='IconButton-Container AvailableModelCard-SelectButton']").should("not.exist");
    
        /** The next button should not appear */
        cy.get(".ReservationsPage-ContinueButton").should("not.exist");
    });
  });

/**
 * Student Dashboard & Nav Tests
 * Checks the basic UI & functionality of student user's dashboard & navigation bar
 * Success: all needed UI components in student works as expected
 */
describe("Student Dashboard & Nav Bar", () => {
  beforeEach(() => {
    cy.visit(home);

    /** Verify if the input field for school email */
    cy.get("input[name='emailAddress']").should("exist").type(prod_student_email);

    /** Verify if "Continue" button */
    cy.contains("Continue").should("exist").click();

    /** Verify if the input field for password */
    cy.get("input[name='password'").should("exist").type(prod_student_password);

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

    /** Verify Settings Navigation */
    cy.get(".NavigationBarButton-SettingsButton").as('setbtn').should("exist");
    cy.get("@setbtn").click();
    cy.url().should("include", "/Settings");

    /** Verify Sign Out Navigation */
    cy.get(".NavigationBarButton-SignOutButton").as('signoutbtn').should("exist");
    cy.get("@signoutbtn").click();
    cy.url().should("eq", prod_url);
  });
});

/**
 * Student Reservation Tests
 * Tests student reservation system's UI and functionalities
 * Contains first success then error test cases
 * Success: make and request/cancel reservations & UI works as expected
 * Fail: tbd
 */
describe("Student Reservation Page", () => {
    beforeEach(() => {
      cy.visit(home);
  
      /** Verify if the input field for school email */
      cy.get("input[name='emailAddress']").should("exist").type(prod_student_email);
      
      /** Verify if "Continue" button */
      cy.contains("Continue").should("exist").click();
      
      /** Verify if the input field for password */
      cy.get("input[name='password'").should("exist").type(prod_student_password);

      /** Verify if "Sign In" button exists */
      cy.contains("Sign In").should("exist").click();
  
      /** Verify if user is navigated to Dashboard */
      cy.url().should("include", "/Dashboard");
  
      /** Verify Reservations Navigation */
      cy.get(".NavigationBarButton-ReservationsButton").as('resbtn').should("exist");
      cy.get("@resbtn").click({force: true});
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
      cy.get("button[class='IconButton-Container AvailableModelCard-SelectButton']").eq(0).should("exist").click();
  
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

    it("Successful Request Reservation", () => {
        /** Assuming 1st item in reservation inventory list has at least 2 items: */
        /** Input the dates */
        cy.get("input[name='startDate'").eq(1).clear().type(todayDate);
        cy.get("input[name='endDate'").eq(1).clear().type(newDate);
    
        /** Click Reserve button */
        cy.contains("Reserve").click({force: true});
        cy.wait(1000);
    
        /** Click on the 1st checkbox*/
        cy.get("button[class='IconButton-Container AvailableModelCard-SelectButton']").eq(0).should("exist").click();
    
        /** Click on the next button */
        cy.get(".ReservationsPage-ContinueButton").eq(0).should("exist").click();
        
        /** Click on the plus button 1 time */
        cy.get("button[class='IconButton-Container SpecifyModelQuantityCard-QuantityUpdateButton']").eq(0).should("exist").click();
    
        /** Click the next button */
        cy.get("button[class='ReservationsPage-ContinueButton StandardButton-Container']").eq(0).should("exist").click();
    
        /** Click the confirm button */
        cy.get("button[class='ReservationsPage-ConfirmButton StandardButton-Container']").eq(0).should("exist").click();
        cy.wait(8000);
    
        /** Go to the Dashboard */
        cy.get(".NavigationBarButton-DashboardButton").as('dashbtn').should("exist");
        cy.get("@dashbtn").click({force:true});
    
        cy.contains("Requested").click();
  
        /** Confirm that the reservation has been successfully requested and is displayed */
        cy.contains(todayDateReformat).should("exist");
        cy.contains(newDateReformat).should("exist");
        cy.contains("2 items").should("exist");
    });

    it("Successful Cancel Reservation", () => {
        /** Go to the Dashboard */
        cy.get(".NavigationBarButton-DashboardButton").as('dashbtn').should("exist");
        cy.get("@dashbtn").click();
        cy.wait(3000);

        /** Click on the "Requested" tab */
        cy.contains("Requested").should("exist").click();
    
        /** Click on the reservation */
        cy.contains(todayDateReformat + " - " + newDateReformat).eq(0).should("exist").click();
    
        /** Click the Cancel button */
        cy.contains("Cancel").should("be.visible").click();
        cy.wait(5000);
    
        /** Confirm that the reservation was cancelled :D */
        cy.contains(todayDateReformat + " - " + newDateReformat).should("not.exist");
    });

    it("Failed Create Reservation with Invalid Start Date", () => {
        /** Input the dates */
        cy.get("input[name='startDate'").eq(1).clear().type("1/18/2020");
        cy.get("input[name='endDate'").eq(1).clear().type(newDate);
    
        /** Click Reserve button */
        cy.contains("Reserve").click({force: true});
        cy.wait(1000);
    
        /** Checkboxes should not appear */
        cy.get("button[class='IconButton-Container AvailableModelCard-SelectButton']").should("not.exist");
    
        /** The next button should not appear */
        cy.get(".ReservationsPage-ContinueButton").should("not.exist");
    });
    
    it("Failed Create Reservation with Invalid End Date", () => {
        /** Input the dates */
        cy.get("input[name='startDate'").eq(1).clear().type(todayDate);
        cy.get("input[name='endDate'").eq(1).clear().type("1/18/2020");
    
        /** Click Reserve button */
        cy.contains("Reserve").click({force: true});
        cy.wait(1000);
    
        /** Checkboxes should not appear */
        cy.get("button[class='IconButton-Container AvailableModelCard-SelectButton']").should("not.exist");
    
        /** The next button should not appear */
        cy.get(".ReservationsPage-ContinueButton").should("not.exist");
    });      
});

/**
 * Admin Approval Test
 * Tests admin reservation approval/reject system
 * (reject only due to student reservation restrictions)
 * Success: approve or reject student reservations
 */
describe("Admin Approve/Reject Reservations", () => {
    beforeEach(() => {
      cy.visit(home);
    });

    it("Student Requests a Reservation", () => {
        /** Sign in to student account */
        cy.get("input[name='emailAddress']").should("exist").type(prod_student_email);
        cy.contains("Continue").should("exist").click();
        cy.get("input[name='password'").should("exist").type(prod_student_password);
        cy.contains("Sign In").should("exist").click();
        cy.url().should("include", "/Dashboard");
        cy.get(".NavigationBarButton-ReservationsButton").as('resbtn').should("exist");
        cy.get("@resbtn").click({force: true});
        cy.url().should("include", "/Reservations");

        /** Make the reservation */
        cy.get("input[name='startDate'").eq(1).clear().type(todayDate);
        cy.get("input[name='endDate'").eq(1).clear().type(newTwoDate);
        cy.contains("Reserve").click({force: true});
        cy.wait(1000);
        cy.get("button[class='IconButton-Container AvailableModelCard-SelectButton']").eq(0).should("exist").click();
        cy.get(".ReservationsPage-ContinueButton").eq(0).should("exist").click();
        cy.get("button[class='ReservationsPage-ContinueButton StandardButton-Container']").eq(0).should("exist").click();
        cy.get("button[class='ReservationsPage-ConfirmButton StandardButton-Container']").eq(0).should("exist").click();
        cy.wait(8000);
    
        /** Go to the Dashboard */
        cy.get(".NavigationBarButton-DashboardButton").as('dashbtn').should("exist");
        cy.get("@dashbtn").click({force:true});
    
        cy.contains("Requested").click();
  
        /** Confirm that the reservation has been successfully requested and is displayed */
        cy.contains(todayDateReformat).should("exist");
        cy.contains(newTwoDateReformat).should("exist");
        cy.contains("1 item").should("exist");
    });
  
    it("Reject a Reservation", () => {
      /** Sign in to admin account */
      cy.get("input[name='emailAddress'").should("exist").type(prod_admin_email);
      cy.contains("Continue").should("exist").click();
      cy.get("input[name='password'").should("exist").type(prod_admin_password);
      cy.contains("Sign In").should("exist").click();
      cy.url().should("include", "/Dashboard");
      
      /** Click on "Requested" Reservation filter */
      cy.contains("Requested").should("exist").click();

      /** Click on the requested reservation from the previous test */
      cy.contains(todayDateReformat + " - " + newTwoDateReformat).eq(0).should("exist").click();

      /** Click on the "Reject" button */
      cy.contains("Reject").should("exist").click();
      cy.wait(3000);

      /** Confirm that the reservation is rejected */
      cy.contains(todayDateReformat + " - " + newTwoDateReformat).should("not.exist");
      cy.contains("Approved").should("exist").click();
      cy.wait(3000);
      cy.contains(todayDateReformat + " - " + newTwoDateReformat).should("not.exist");
    });
});
