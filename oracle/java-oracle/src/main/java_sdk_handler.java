import com.amazonaws.services.lambda.runtime.RequestHandler;
import com.amazonaws.services.lambda.runtime.Context;

public class SdkHandler implements RequestHandler<Request, Response> {

    public Response handleRequest(Request request, Context context) {
        return new Response();
    }
}