using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using NavigIT.Enum;

namespace NavigIT.Util
{
    // A generic class that represents a response from a web API
    public class BaseResponse<T>
    {
        // Default constructor
        public BaseResponse()
        {
        }

        // Constructor that initializes the response with data and a response message
        public BaseResponse(T data, string responseMessage = null)
        {
            this.Data = data;
            this.Status = RequestExecution.Successful;
            this.ResponseMessage = responseMessage;
        }

        // Constructor that initializes the response with data, a total count, and a response message
        public BaseResponse(T data, int totalCount, string responseMessage = null)
        {
            this.Data = data;
            this.TotalCount = totalCount;
            this.Status = RequestExecution.Successful;
            this.ResponseMessage = responseMessage;
        }

        // Constructor that initializes the response with an error message and a list of errors
        public BaseResponse(string error, List<string> errors = null)
        {
            this.Status = RequestExecution.Failed;
            this.ResponseMessage = error;
            this.Errors = errors;
        }

        // Constructor that initializes the response with data, an error message, a list of errors, and a status
        public BaseResponse(T data, string error, List<string> errors, RequestExecution status)
        {
            this.Status = status;
            this.ResponseMessage = error;
            this.Errors = errors;
            this.Data = data;
        }

        // The status of the response (successful or failed)
        public RequestExecution Status { get; set; }

        // The data returned by the API
        public T Data { get; set; }

        // A message returned by the API
        public string ResponseMessage { get; set; }

        // The total count of items returned by the API
        public int TotalCount { get; set; }

        // A list of errors returned by the API
        public List<string> Errors { get; set; } = new List<string>();
    }
}