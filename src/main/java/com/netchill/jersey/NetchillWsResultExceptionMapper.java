package com.netchill.jersey;

import com.coreoz.plume.jersey.errors.ErrorResponse;
import com.coreoz.plume.jersey.errors.WsException;
import com.coreoz.plume.jersey.errors.WsResultExceptionMapper;
import com.netchill.webservices.error.NetchillWsError;

import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

public class NetchillWsResultExceptionMapper extends WsResultExceptionMapper {
    @Override
    public Response toResponse(Throwable e) {
        if (e instanceof WsException wsException && wsException.getError() == NetchillWsError.RESOURCE_NOT_FOUND) {
            return Response
                .status(Response.Status.NOT_FOUND)
                .entity(new ErrorResponse(wsException.getError(), wsException.getStatusArguments()))
                .type(MediaType.APPLICATION_JSON_TYPE)
                .build();
        }

        return super.toResponse(e);
    }
}
