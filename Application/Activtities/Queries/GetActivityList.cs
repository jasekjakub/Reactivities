using System;
using System.ComponentModel;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;
using Domain;

namespace Application.Activtities.Queries;

public class GetActivityList
{
    public class Query : IRequest<List<Activity>>{}

    public class Handler (AppDbContext context) : IRequestHandler<Query, List<Activity>>
    {
        public async Task<List<Activity>> Handle(Query request, CancellationToken cancellationToken)
        {
            return await context.Activities.ToListAsync(cancellationToken);
        }
    }
}
