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
 */
describe("Sign In Page", () => {
  beforeEach(() => {
    cy.visit(home);
  });

  it("This is the Sign In Page", () => {
    /** Verify if this is a Sign In page */
    cy.contains("Sign In").should("exist");

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
    cy.login("user_test@spu.edu", "test123");
  })

  it("Failed Sign In with Invalid Email (non-SPU)", () => {
    /** Verify if the input field for school email */
    cy.get("input[name='emailAddress'").should("exist").type("user_test@outlook.com");

    /** Verify if "Continue" button */
    cy.contains("Continue").should("exist").click();

    /** Verify if valid email address error message appears */
    cy.contains("Please enter a valid school email address.").should("exist");

    /** Verify if user stays on the current page */
    cy.url().should("include", "/");
  })

  it("Failed Sign In with Invalid Email (format)", () => {
    /** Verify if the input field for school email */
    cy.get("input[name='emailAddress'").should("exist").type("user_test@.com");

    /** Verify if "Continue" button */
    cy.contains("Continue").should("exist").click();

    /** Verify if valid email address error message appears */
    cy.contains("Please enter a valid school email address.").should("exist");

    /** Verify if user stays on the current page */
    cy.url().should("include", "/");
  })

  it("Failed Sign In with No Password", () => {
    /** Verify if the input field for school email */
    cy.get("input[name='emailAddress'").should("exist").type("user_test@spu.edu");

    /** Verify if "Continue" button */
    cy.contains("Continue").should("exist").click();

    /** Verify if "Sign In" button exists */
    cy.contains("Sign In").should("exist").click();

    /** Verify if no password error message appears */
    cy.contains("Please enter your password.").should("exist");

    /** Verify if user stays on the current page */
    cy.url().should("include", "/");
  })

  it("Failed Sign In with Invalid Password", () => {
    /** Verify if the input field for school email */
    cy.get("input[name='emailAddress'").should("exist").type("user_test@spu.edu");

    /** Verify if "Continue" button */
    cy.contains("Continue").should("exist").click();

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

describe("Dashboard Page", () => {
  beforeEach(() => {
    cy.visit(home);
  });

  it("Dashboard for Admin", () => {
    //#region Sign In with Admin Credentials
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
    //#endregion

    //#region Verify Admin Specifications
    /** Verify if the inventory list exists */
    cy.get(".AdminDashboard-InventorySection").should("exist");

    /** Verify if the reservation section exists*/
    cy.get(".AdminDashboard-ReservationSection").should("exist");

    /** Verify if the "Add Equipment" button exists and functionality works*/
    cy.get(".AdminDashboard-AddEquipmentButton").should("exist").click();
    cy.url().should("include", "/AddToInventory");
    //#endregion
  });

  it("Dashboard for Faculty", () => {
    //#region Sign In with Faculty Credentials
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
    //#endregion

    //#region Verify Faculty-Dashboard Specified
    /** Verify if the Equipment Usage Section that contains two filters - "Currently Using" and "Recently Used" exist */
    cy.get(".FacultyDashboard-EquipmentFilterSection").should("exist");
    cy.get(".FacultyDashboard-EquipmentFilterCardList").should("exist");
    cy.contains("Currently Using").should("exist");
    cy.contains("Recently Used").should("exist");

    /** Verify if the "Make Reservation" exists and functionality works */
    cy.get(".FacultyDashboard-MakeReservationButton").should("exist").click();
    cy.url().should("include", "/Reservations");
    //#endregion
  });

  it("Dashboard for Student", () => {
    //#region Sign In with Student Credentials
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
    //#endregion

    //#region Verify Student-Dashboard Specified
    /** Verify if the Equipment Usage Section that contains two filters - "Currently Using" and "Recently Used" exist */
    cy.get(".StudentDashboard-EquipmentFilterSection").should("exist");
    cy.get(".StudentDashboard-EquipmentFilterCardList").should("exist");
    cy.contains("Currently Using").should("exist");
    cy.contains("Recently Used").should("exist");
    
    /** Verify if the "Make Reservation" exists and functionality works */
    cy.get(".StudentDashboard-MakeReservationButton").should("exist").click();
    cy.url().should("include", "/Reservations");
    //#endregion
  });
});

describe("Navigation Bar", () => {
  beforeEach(() => {
    cy.visit(home);
  });

  it("Navigation Bar for Admin", () => {
    //#region Sign In with Admin Credentials
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
    //#endregion

    //#region Verify Admin-Navigation Bar Specified
    /** Verify if the admin-specific buttons exist */
    cy.get(".NavigationBarButton-InventoryButton").should("exist");
    cy.get(".NavigationBarButton-AddEquipmentButton").should("exist");
    cy.get(".NavigationBarButton-UsersButton").should("exist");

    /** Verify if the general buttons exist */
    cy.get(".NavigationBarButton-DashboardButton").should("exist");
    cy.get(".NavigationBarButton-ReservationsButton").should("exist");
    cy.get(".NavigationBarButton-NotificationsButton").should("exist");
    cy.get(".NavigationBarButton-SettingsButton").should("exist");
    cy.get(".NavigationBarButton-SignOutButton").should("exist");
    //#endregion

    //#region Verify All the Functionalities of Navigation Buttons
    /** Verify Dashboard Navigation */
    cy.get(".NavigationBarButton-DashboardButton").click();
    cy.url().should("include", "/Dashboard");

    /** Verify Reservations Navigation */
    cy.get(".NavigationBarButton-ReservationsButton").click();
    cy.url().should("include", "/Reservations");

    /** Verify Notifications Navigation */
    cy.get(".NavigationBarButton-NotificationsButton").click();
    cy.url().should("include", "/Notifications");

    /** Verify Settings Navigation */
    cy.get(".NavigationBarButton-SettingsButton").click();
    cy.url().should("include", "/Settings");

    /** Verify Inventory Navigation */
    cy.get(".NavigationBarButton-InventoryButton").click();
    cy.url().should("include", "/Inventory");

    /** Verify Add To Inventory Navigation */
    cy.get(".NavigationBarButton-AddEquipmentButton").click();
    cy.url().should("include", "/AddToInventory");

    /** Verify Users Navigation */
    cy.get(".NavigationBarButton-UsersButton").click();
    cy.url().should("include", "/Users");

    /** Verify Sign Out Navigation */
    cy.get(".NavigationBarButton-SignOutButton").click();
    cy.url().should("eq", 'http://localhost:3000/');
    //#endregion
  });

  it("Navigation Bar for Faculty", () => {
    //#region Sign In with Faculty Credentials
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
    //#endregion

    //#region Verify Faculty-Navigation Bar Specified
    /** Verify if the general/faculty-specific buttons exist */
    cy.get(".NavigationBarButton-DashboardButton").should("exist");
    cy.get(".NavigationBarButton-ReservationsButton").should("exist");
    cy.get(".NavigationBarButton-NotificationsButton").should("exist");
    cy.get(".NavigationBarButton-SettingsButton").should("exist");
    cy.get(".NavigationBarButton-SignOutButton").should("exist");
    //#endregion

    //#region Verify All the Functionalities of Navigation Buttons
    /** Verify Dashboard Navigation */
    cy.get(".NavigationBarButton-DashboardButton").click();
    cy.url().should("include", "/Dashboard");

    /** Verify Reservations Navigation */
    cy.get(".NavigationBarButton-ReservationsButton").click();
    cy.url().should("include", "/Reservations");

    /** Verify Notifications Navigation */
    cy.get(".NavigationBarButton-NotificationsButton").click();
    cy.url().should("include", "/Notifications");

    /** Verify Settings Navigation */
    cy.get(".NavigationBarButton-SettingsButton").click();
    cy.url().should("include", "/Settings");

    /** Verify Sign Out Navigation */
    cy.get(".NavigationBarButton-SignOutButton").click();
    cy.url().should("eq", 'http://localhost:3000/');
    //#endregion
  });

  it("Navigation Bar for Student", () => {
    //#region Sign In with Student Credentials
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
    //#endregion

    //#region Verify Student-Sign In Specified
    /** Verify if the general/student-specific buttons exist */
    cy.get(".NavigationBarButton-DashboardButton").should("exist");
    cy.get(".NavigationBarButton-ReservationsButton").should("exist");
    cy.get(".NavigationBarButton-NotificationsButton").should("exist");
    cy.get(".NavigationBarButton-SettingsButton").should("exist");
    cy.get(".NavigationBarButton-SignOutButton").should("exist");
    //#endregion

    //#region Verify All the Functionalities of Navigation Buttons
    /** Verify Dashboard Navigation */
    cy.get(".NavigationBarButton-DashboardButton").click();
    cy.url().should("include", "/Dashboard");

    /** Verify Reservations Navigation */
    cy.get(".NavigationBarButton-ReservationsButton").click();
    cy.url().should("include", "/Reservations");

    /** Verify Notifications Navigation */
    cy.get(".NavigationBarButton-NotificationsButton").click();
    cy.url().should("include", "/Notifications");

    /** Verify Settings Navigation */
    cy.get(".NavigationBarButton-SettingsButton").click();
    cy.url().should("include", "/Settings");

    /** Verify Sign Out Navigation */
    cy.get(".NavigationBarButton-SignOutButton").click();
    cy.url().should("eq", 'http://localhost:3000/');
    //#endregion
  });
});
