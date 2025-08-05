void automation.test(Int dealID)
{
try 
{
	dealRecord = zoho.crm.getRecordById("Deals",dealID);
	dealStage = dealRecord.get("Stage");
	// 	info dealRecord;
	if(dealStage != "Closed Won")
	{
		info "Deal is not in 'Closed Won' stage.";
		return;
	}
	accountMap = dealRecord.get("Account_Name");
	//     contactMap = dealRecord.get("Contact_Name");
	warrantyDuration = dealRecord.get("Warranty_Duration");
	info accountMap;
	// 	info contactMap;
	info warrantyDuration;
	//     if (accountMap == null || contactMap == null || warrantyDuration == null)
	if(accountMap == null || warrantyDuration == null)
	{
		info "Missing required fields.";
		return;
	}
	accountId = accountMap.get("id");
	//     contactId = contactMap.get("id");
	warrantyStartDate = zoho.currenttime;
	// Better for datetime than zoho.currentdate
	durationStr = warrantyDuration.toString().trim();
	durationNum = 0;
	try 
	{
		durationNum = durationStr.getPrefix(" ").toLong();
	}
	catch (e)
	{
		info "Invalid Warranty Duration format: " + durationStr;
		return;
	}
	warrantyEndDate = warrantyStartDate.addYear(durationNum);
	maintenance = Map();
	maintenance.put("Name",accountMap.get("name"));
	// Set Maintenance Name from Account Name
	maintenance.put("Account",{"id":accountId});
	// maintenance.put("Contact", {"id": contactId});
	maintenance.put("Deal",{"id":dealID});
	maintenance.put("Warranty_Start_Date",warrantyStartDate.toString("yyyy-MM-dd'T'HH:mm:ss"));
	maintenance.put("Warranty_End_Date",warrantyEndDate.toString("yyyy-MM-dd'T'HH:mm:ss"));
	createResp = zoho.crm.createRecord("Maintenance",maintenance);
	info "Maintenance Create Response: " + createResp.toString();
	if(createResp.get("code") != "SUCCESS")
	{
		info "Failed to create Maintenance record. Reason: " + createResp.get("message");
	}
}
catch (ex)
{
	info "Error occurred: " + ex.toString();
}
}