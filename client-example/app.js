$(document).ready(function () {

    // Create
    $("#createDisplay").on("click", function () {
        $("#createDiv").show();
        $("#retrieveDiv").hide();
        $("#updateDiv").hide();
        $("#deleteDiv").hide();
    });

    $("#createEntry").on("click", function () {

        var formData = $("#createForm").serialize();

        var restCall = $.ajax({
            method: "POST",
            url: "http://localhost:8081/addEntry",
            data: formData,
            datatype: 'json'
        });

        restCall.success(function (data) {
            $("#createForm").each(function () {
                this.reset();
            });
        });

        restCall.error(function (jqXHR, textStatus, errorThrown) {
            console.log(textStatus + ":" + errorThrown);
        });
    });

    // Retrieve
    $("#retrieveDisplay").on("click", function () {
        $("#createDiv").hide();
        $("#retrieveDiv").show();
        $("#updateDiv").hide();
        $("#deleteDiv").hide();
        getPhoneNumbers();
    });

    function getPhoneNumbers() {

        var restCall = $.ajax({
            method: "GET",
            url: "http://localhost:8081/getAllEntries",
            datatype: 'json'
        });

        restCall.success(function (data) {
            // Clear the old
            $("#phoneList").empty();
            var output = "<table><tr><th>ID</th><th>First Name</th><th>Last Name</th><th>Phone Number</th></tr>";
            var jsonData = JSON.parse(data);
            for (var i = 0; i < jsonData["entries"].length; i++) {
                var entry = jsonData["entries"][i];
                output += "<tr>";
                output += "<td>" + entry.id + "</td>";
                output += "<td>" + entry.fname + "</td>";
                output += "<td>" + entry.lname + "</td>";
                output += "<td>" + entry.pnum + "</td>";
                output += "</tr>";
            }
            output += "</table>";
            $("#phoneList").html(output);
        });

        restCall.error(function (jqXHR, textStatus, errorThrown) {
            console.log(textStatus + ":" + errorThrown);
        });
    }

    // Update
    $("#updateDisplay").on("click", function () {
        $("#createDiv").hide();
        $("#retrieveDiv").hide();
        $("#updateDiv").show();
        $("#deleteDiv").hide();
    });

    $("#updateEntry").on("click", function () {
        var formData = $("#updateForm").serialize();

        var restCall = $.ajax({
            method: "PUT",
            url: "http://localhost:8081/updateEntry",
            data: formData,
            datatype: 'json'
        });

        restCall.success(function (data) {
            $("#updateForm").each(function () {
                this.reset();
            });
        });

        restCall.error(function (jqXHR, textStatus, errorThrown) {
            console.log(textStatus + ":" + errorThrown);
        });
    });

    // Delete
    $("#deleteDisplay").on("click", function () {
        $("#createDiv").hide();
        $("#retrieveDiv").hide();
        $("#updateDiv").hide();
        $("#deleteDiv").show();
    });

    $("#deleteEntry").on("click", function () {
        var id = $("#deleteId").val();

        var restCall = $.ajax({
            method: "DELETE",
            url: "http://localhost:8081/" + id,
            datatype: 'json'
        });

        restCall.success(function (data) {
            console.log(data);
            $("#deleteId").val("");
        });

        restCall.error(function (jqXHR, textStatus, errorThrown) {
            console.log(textStatus + ":" + errorThrown);
        });
    });
});
