# Azurebingentity


  
 Azure Bing Entity Search.
 
 What is bing entity search?
 
 When ever user is in a particular page and comes across a term which he is not familiar.
 User tends to go away from that website and search the term which has caused the websites to loose users.
 Azure bing entity search comes in play so that user can know about the term(based on the region) just by clicking it without leaving the website.
 
 This api will utilize bing entity search of azure 
 
 
 1) Enter the end point in postman http://64.225.28.35:3000/api/v1/token and select the method to be POST which is available just beside the URL.
    Select type as raw for the request body and json from the dropdown.
	
	
	In the Request Body please enter the following parameters
	{
	"name": "Anoop",
	"securecode": "system"
     }
	 
	 both of the values should be same as these are used for the purpose of demo.
	 
	 
	You will recieve response as below:
   
    {
    "Token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6IkFub29wIiwiaWF0IjoxNTg4MTE4NjQ2LCJleHAiOjE1ODgxMTkwMDZ9.JT0eDi4s7_VhhCEcICQGgvZoJkX8T4cn8td1ApNLQk4"
    }
    
    This Token will be valid for 6 minutes.

 2) Now after recieving the intial token enter  the end point of bing entity search api 
    http://64.225.28.35:3000/api/v1/BingEntitySearch and select the method to be POST which is available just beside the URL.
	
	First In header give the following key and value :
	
	Key : Authorization and Value: Token which you recieved from the prevoius endpoint.
	
	Select type as raw for the request body and json from the dropdown.
	In the Request Body please enter the following parameters
	
	Region : this specifies which language and region you want to search the term i.e en-US for america , en-IN for India.
	
	Word : in this field mention the word or entity you want to search.
	
	Example: 
	
	{
	"Region": "en-US",or "en-IN"
	"Word": "Anoop"
    }

    After submiitting you will recive response related to the request.(Try giving both the regions mentioned above to see the difference in response)
	
3) You can also test from the swagger by using  http://64.225.28.35:3000/api-docs/  
   in similar manner to the above.
   First use http://64.225.28.35:3000/api/v1/token  enter the details as below 
   {
	"name": "Anoop",
	"securecode": "system"
     }

	 get the token from the response.

	 Second use http://64.225.28.35:3000/api/v1/BingEntitySearch enter details as per the below example or change accordingly 

	 Example: 

	{
	"Authorization": This value should be the token from above output.
	"Region": "en-US",or "en-IN"
	"Word": "Anoop"
    }
