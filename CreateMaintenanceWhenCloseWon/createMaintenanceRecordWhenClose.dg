void automation.Create_Maintenance_When_Closed_Won1(Int deal)
{
try 
{
	// Step 1: Validate Stage
	if(deal.get("Stage") != "Closed Won")
	{
		info "Stage is not Closed Won. Exiting.";
		return;
	}
	// Step 2: Fetch required fields
	account = deal.get("Account");
	contact = deal.get("Contact_Name");
	warrantyDuration = deal.get("Warranty_Duration");
	if(account == null || contact == null || warrantyDuration == null)
	{
		info "Missing required fields: Account, Contact, or Warranty Duration.";
		return;
	}
	// Step 3: Extract IDs and parse warranty duration
	accountId = account.get("id");
	contactId = contact.get("id");
	dealId = deal.get("id");
	durationStr = warrantyDuration.toString().trim();
	durationNum = 0;
	try 
	{
		durationNum = durationStr.getPrefix(" ").toLong();
		// Expects format like "2 years"
	}
	catch (e)
	{
		info "Invalid warranty format: " + durationStr;
		return;
	}
	// Step 4: Calculate dates
	warrantyStartDate = zoho.currentdate;
	warrantyEndDate = warrantyStartDate.addYear(durationNum);
	// Step 5: Prepare Maintenance record
	maintenance = Map();
	maintenance.put("Account",{"id":accountId});
	maintenance.put("Contact",{"id":contactId});
	maintenance.put("Deal",{"id":dealId});
	maintenance.put("Warranty_Start_Date",warrantyStartDate);
	maintenance.put("Warranty_End_Date",warrantyEndDate);
	// Step 6: Create Maintenance record
	createResp = zoho.crm.createRecord("Maintenance",maintenance);
	info "Maintenance record creation response: " + createResp.toString();
}
catch (err)
{
	info "Function error: " + err.toString();
}
}